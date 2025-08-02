import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrainingTable from './index';


jest.mock('../../../hooks/useFetchTrainingSessions', () => ({
  useFetchTrainingSessions: jest.fn(),
}));

import { useFetchTrainingSessions } from '../../../hooks/useFetchTrainingSessions';

describe('TrainingTable', () => {
  const mockData = [
    { id: 1, title: 'Session 1', location: 'Loc 1', description: 'Desc 1', registered: 10, start_date: '2025-01-01', end_date: '2025-01-05' },
    { id: 2, title: 'Session 2', location: 'Loc 2', description: 'Desc 2', registered: 20, start_date: '2025-02-01', end_date: '2025-02-05' },
    { id: 3, title: 'Session 3', location: 'Loc 3', description: 'Desc 3', registered: 30, start_date: '2025-03-01', end_date: '2025-03-05' },
    { id: 4, title: 'Session 4', location: 'Loc 4', description: 'Desc 4', registered: 40, start_date: '2025-04-01', end_date: '2025-04-05' },
    { id: 5, title: 'Session 5', location: 'Loc 5', description: 'Desc 5', registered: 50, start_date: '2025-05-01', end_date: '2025-05-05' },
    { id: 6, title: 'Session 6', location: 'Loc 6', description: 'Desc 6', registered: 60, start_date: '2025-06-01', end_date: '2025-06-05' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading indicator when loading', () => {
    useFetchTrainingSessions.mockReturnValue({
      loading: true,
      error: null,
      currentItems: [],
    });

    render(<TrainingTable />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('displays error message when error occurs', () => {
    useFetchTrainingSessions.mockReturnValue({
      loading: false,
      error: 'Failed to fetch data',
      currentItems: [],
    });

    render(<TrainingTable />);
    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  test('renders table rows with data', () => {
    useFetchTrainingSessions.mockReturnValue({
      loading: false,
      error: null,
      currentItems: mockData,
    });

    render(<TrainingTable />);

  
    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(6);

 
    expect(screen.getByText('Session 1')).toBeInTheDocument();
 
    expect(screen.queryByText('Session 6')).not.toBeInTheDocument();
  });

  test('pagination buttons work correctly', () => {
    useFetchTrainingSessions.mockReturnValue({
      loading: false,
      error: null,
      currentItems: mockData,
    });

    render(<TrainingTable />);

    expect(screen.queryByText(/prev/i)).not.toBeInTheDocument();


    const nextButton = screen.getByText(/next/i);

 
    fireEvent.click(nextButton);


    expect(screen.getByText('Session 6')).toBeInTheDocument();


    const prevButton = screen.getByText(/prev/i);
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.queryByText('Session 6')).not.toBeInTheDocument();
  });

  test('page number buttons switch pages correctly', () => {
    useFetchTrainingSessions.mockReturnValue({
      loading: false,
      error: null,
      currentItems: mockData,
    });

    render(<TrainingTable />);

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(screen.getByText('Session 6')).toBeInTheDocument();
    expect(screen.queryByText('Session 1')).not.toBeInTheDocument();
  });
});
