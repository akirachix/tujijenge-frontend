import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImpactChart from './index'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Import the mocked version

// --- Mocks ---
// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Import and retain default behavior
  useNavigate: () => mockNavigate,         // Override useNavigate with the mock
}));

// Mock child components
jest.mock('../CalendarView', () => {
  // eslint-disable-next-line react/prop-types
  return function DummyCalendarView({ onclick }) { // Correctly receive onclick prop
    return <div data-testid="calendar-view" onClick={onclick}>Mocked CalendarView</div>;
  };
});

jest.mock('react-chartjs-2', () => ({
  ...jest.requireActual('react-chartjs-2'),
  Doughnut: () => <div data-testid="doughnut-chart">Mocked Doughnut Chart</div>,
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <i data-testid="font-awesome-icon"></i>,
}));


// --- Test Suite ---
describe('ImpactChart Component', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockNavigate.mockClear();
  });

  test('renders without crashing', () => {
    render(<ImpactChart />);
    expect(screen.getByText('Impact')).toBeInTheDocument();
  });

  test('displays the correct chart title', () => {
    render(<ImpactChart />);
    expect(screen.getByRole('heading', { name: /impact/i })).toBeInTheDocument();
  });

  test('displays the correct legend labels from static data', () => {
    render(<ImpactChart />);
    expect(screen.getByText('Trained Mama Mboga')).toBeInTheDocument();
    expect(screen.getByText('Untrained Mama Mboga')).toBeInTheDocument();
  });

  test('displays the correct trained percentage in the doughnut inner text', () => {
    render(<ImpactChart />);
    const data = {
      labels: ["Trained Mama Mboga", "Untrained Mama Mboga"],
      datasets: [{
        data: [60, 40],
        // ... other dataset properties
      }],
    };
    const trainedPercentage = data.datasets[0].data[0];
    
    // Check for the percentage value
    expect(screen.getByText(`${trainedPercentage}%`)).toBeInTheDocument();
    // Check for the "Trained" label below the percentage
    expect(screen.getByText((content, element) => {
      // Custom text matcher to find "Trained" specifically within the doughnut-inner
      const hasText = (node) => node.textContent === "Trained";
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText && element.closest('.doughnut-inner');
    })).toBeInTheDocument();
  });

  test('renders the mocked Doughnut chart', () => {
    render(<ImpactChart />);
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument();
  });

  test('renders the mocked CalendarView', () => {
    render(<ImpactChart />);
    expect(screen.getByTestId('calendar-view')).toBeInTheDocument();
    expect(screen.getByText('Mocked CalendarView')).toBeInTheDocument();
  });

  test('calls navigate with "/calendar" when CalendarView is clicked', () => {
    render(<ImpactChart />);
    const calendarView = screen.getByTestId('calendar-view');
    fireEvent.click(calendarView);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/calendar');
  });

  test('displays static card data correctly', () => {
    render(<ImpactChart />);
    // Card 1
    expect(screen.getByText(/Communities: 15/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of communities trained: 10/i)).toBeInTheDocument();
    // Card 2
    expect(screen.getByText(/Mama Mboga: 300/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of mama mboga trained: 200/i)).toBeInTheDocument();
  });

  test('renders FontAwesomeIcons', () => {
    render(<ImpactChart />);
    const icons = screen.getAllByTestId('font-awesome-icon');
    expect(icons.length).toBeGreaterThanOrEqual(2); // Expecting at least two icons for the cards
  });
});
