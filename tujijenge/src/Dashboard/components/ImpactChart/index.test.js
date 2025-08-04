import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImpactChart from './index';
import * as dataUtils from '../../../utils/dataUtils';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (
      typeof message === 'string' &&
      (message.includes('React Router Future Flag') ||
        message.includes('No authentication token found for API'))
    ) {
      return;
    }
    console.warn(message);
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

describe('ImpactChart', () => {
  const baseUrl = 'https://fakeapi.com';
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
    process.env.REACT_APP_BASE_URL = baseUrl;
    process.env.REACT_APP_TOKEN = 'fake_token';

    global.fetch = jest.fn((url) => {
      if (url.endsWith('/users')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fakeMamaMbogas),
        });
      }
      if (url.endsWith('/community')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fakeCommunities),
        });
      }
      if (url.endsWith('/training_registration')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fakeRegistrations),
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
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
    jest.clearAllMocks();
    delete process.env.REACT_APP_BASE_URL;
    delete process.env.REACT_APP_TOKEN;
  });

  test('renders stats and chart based on fetched data', async () => {
    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

 
    await waitFor(() => {
      // Communities card
      const communitiesCard = screen.getByText(/Communities:/i).parentElement;
      expect(communitiesCard).toHaveTextContent('2'); // total communities
      expect(communitiesCard).toHaveTextContent('1'); // trained communities

      // Mama Mboga card
      const mamaMbogaCard = screen.getByText(/Mama Mboga:/i).parentElement;
      expect(mamaMbogaCard).toHaveTextContent('2'); 
      expect(mamaMbogaCard).toHaveTextContent('1'); 

      // Impact chart title
      expect(screen.getByText(/Impact/i)).toBeInTheDocument();

      // Doughnut chart with correct data
      const doughnutChart = screen.getByTestId('doughnut-chart');
      expect(doughnutChart).toBeInTheDocument();
      expect(doughnutChart).toHaveTextContent('"data":[1,1]'); 
      

      // Percentage text check
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  test('handles missing token by skipping fetch', () => {
    delete process.env.REACT_APP_TOKEN;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith('No authentication token found for API. Skipping fetch.');

    consoleWarnSpy.mockRestore();
  });

  test('navigates to /calendar on calendar click', async () => {
    render(
      <BrowserRouter>
        <ImpactChart />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByTestId('calendar-view'));

    screen.getByTestId('calendar-view').click();

    expect(mockedNavigate).toHaveBeenCalledWith('/calendar');
  });
});


