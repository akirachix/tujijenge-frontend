import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImpactChart from './index'; 
import * as dataUtils from '../../../utils/dataUtils';
import * as apiUtils from '../../../utils/api'; 
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
  const originalWarn = console.warn;
  jest.spyOn(console, 'warn').mockImplementation((message, ...args) => {
    if (
      typeof message === 'string' &&
      (message.includes('React Router Future Flag') || 
        message.includes('No authentication token found for API') || 
        message.includes('Error fetching data:')) 
    ) {
      return;
    }
    originalWarn(message, ...args); 
  });
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../EventCalendar', () => (props) => (
  <div data-testid="calendar-view" onClick={props.onClick}>
    CalendarViewMock
  </div>
));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>Icon</span>,
}));

jest.mock('react-chartjs-2', () => ({
  Doughnut: (props) => (
    <div data-testid="doughnut-chart">
      <pre>{JSON.stringify(props.data)}</pre>
    </div>
  ),
}));

jest.mock('../../../utils/api', () => ({
  ...jest.requireActual('../../../utils/api'), 
  authenticatedFetch: jest.fn(), 
  BASE_URL: 'https://fakeapi.com', 
                                 
}));


describe('ImpactChart', () => {
  // const baseUrl = 'https://fakeapi.com'; 
  const fakeMamaMbogas = [
    { id: 1, certified_status: 'certified' },
    { id: 2, certified_status: 'not_certified' },
  ];
  const fakeCommunities = [
    { community_id: 1, created_by: 1 },
    { community_id: 2, created_by: 2 },
  ];
  const fakeRegistrations = [
    { registration_id: 1, mamamboga: 1 },
    { registration_id: 2, mamamboga: 2 },
  ];

  beforeEach(() => {
    mockedNavigate.mockClear();
    apiUtils.authenticatedFetch.mockClear(); 

    apiUtils.authenticatedFetch.mockImplementation(async (url) => {
      if (url.endsWith('/users')) {
        return fakeMamaMbogas;
      }
      if (url.endsWith('/community')) {
        return fakeCommunities;
      }
      if (url.endsWith('/training_registration')) {
        return fakeRegistrations;
      }
      throw new Error(`Unknown endpoint in mock: ${url}`);
    });


    jest.spyOn(dataUtils, 'getMamaMbogaCounts').mockImplementation((mamaMbogas) => {
      const trained = mamaMbogas.filter(m => m.certified_status === 'certified').length;
      const total = mamaMbogas.length;
      return { total, trained, untrained: total - trained };
    });

    jest.spyOn(dataUtils, 'getCommunityStats').mockImplementation((communities, mamaMbogas) => {
      const trainedMamaMbogaIds = new Set(
        mamaMbogas.filter(m => m.certified_status === 'certified').map(m => m.id)
      );
      const trainedCommunities = communities.filter(c => trainedMamaMbogaIds.has(c.created_by)).length;
      return {
        totalCommunities: communities.length,
        trainedCommunities,
      };
    });

    jest.spyOn(dataUtils, 'getRegistrationsForTrainedMamaMboga').mockImplementation((registrations, mamaMbogas) => {
      const trainedMamaMbogaIds = new Set(
        mamaMbogas.filter(m => m.certified_status === 'certified').map(m => m.id)
      );
      return registrations.filter(reg => trainedMamaMbogaIds.has(reg.mamamboga));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restores original implementations, good practice
  });

  test('renders stats and chart based on fetched data', async () => {
    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    expect(apiUtils.authenticatedFetch).toHaveBeenCalledWith(`${apiUtils.BASE_URL}/users`);
    expect(apiUtils.authenticatedFetch).toHaveBeenCalledWith(`${apiUtils.BASE_URL}/community`);
    expect(apiUtils.authenticatedFetch).toHaveBeenCalledWith(`${apiUtils.BASE_URL}/training_registration`);


    await waitFor(() => {
      const communitiesCard = screen.getByText(/Communities:/i).parentElement;
      expect(communitiesCard).toHaveTextContent('2'); 
      expect(communitiesCard).toHaveTextContent('1'); 
      const mamaMbogaCard = screen.getByText(/Mama Mboga:/i).parentElement;
      expect(mamaMbogaCard).toHaveTextContent('2'); 
      expect(mamaMbogaCard).toHaveTextContent('1'); 

      expect(screen.getByText(/Impact/i)).toBeInTheDocument();

      const doughnutChart = screen.getByTestId('doughnut-chart');
      expect(doughnutChart).toBeInTheDocument();
      expect(JSON.parse(doughnutChart.textContent).datasets[0].data).toEqual([1, 1]);


      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    apiUtils.authenticatedFetch.mockRejectedValue(new Error('Network Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});


    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });

    const communitiesCard = screen.getByText(/Communities:/i).parentElement;
    expect(communitiesCard).toHaveTextContent('0');
    const mamaMbogaCard = screen.getByText(/Mama Mboga:/i).parentElement;
    expect(mamaMbogaCard).toHaveTextContent('0');
    expect(screen.getByText('0%')).toBeInTheDocument(); 

    consoleErrorSpy.mockRestore();
  });


  test('navigates to /calendar on calendar click', async () => {
    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    await waitFor(() => expect(apiUtils.authenticatedFetch).toHaveBeenCalledTimes(3));

    await waitFor(() => screen.getByTestId('calendar-view'));


    screen.getByTestId('calendar-view').click();

    expect(mockedNavigate).toHaveBeenCalledWith('/calendar');
  });



  test('handles failure from authenticatedFetch (e.g., due to missing token)', async () => {
    apiUtils.authenticatedFetch.mockRejectedValue(new Error('Auth token not found')); 
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });


    const communitiesCard = screen.getByText(/Communities:/i).parentElement;
    expect(communitiesCard).toHaveTextContent('Communities: 0');
    expect(communitiesCard).toHaveTextContent('Number of communities trained: 0');

    const mamaMbogaCard = screen.getByText(/Mama Mboga:/i).parentElement;
    expect(mamaMbogaCard).toHaveTextContent('Mama Mboga: 0');
    expect(mamaMbogaCard).toHaveTextContent('Number of mama mboga trained: 0');

    expect(screen.getByText('0%')).toBeInTheDocument(); 

    consoleErrorSpy.mockRestore();
  });
});
