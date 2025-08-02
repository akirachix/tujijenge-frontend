import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrainingCalendar from './index';
import { useEvents } from '../context/useEvents';


jest.mock('../context/useEvents');

global.alert = jest.fn();

describe('TrainingCalendar', () => {
  let mockAddEvent, mockUpdateEvent, mockDeleteEvent;


  const sampleEvent = {
    id: '1',
    title: 'Sample Event',
    startDate: '2025-07-15T00:00:00.000Z',
    start_date: '2025-07-15',
    location: 'Test Location',
  };

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2025-07-01T00:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockAddEvent = jest.fn();
    mockUpdateEvent = jest.fn();
    mockDeleteEvent = jest.fn().mockResolvedValue(true); 
    useEvents.mockReturnValue({
      events: [sampleEvent],
      addEvent: mockAddEvent,
      updateEvent: mockUpdateEvent,
      deleteEvent: mockDeleteEvent,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders a day cell with event and can open modal on click', () => {
    render(<TrainingCalendar />);

    const dayWithEvent = screen.getByText(sampleEvent.title);
    expect(dayWithEvent).toBeInTheDocument();

    fireEvent.click(dayWithEvent.closest('.calendar-cell'));

    expect(screen.getByText(/Edit Training Session/i)).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/Title:/i);
    expect(titleInput).toHaveValue(sampleEvent.title);
  });

  test('can delete an existing event', async () => {
    render(<TrainingCalendar />);
  
    const dayWithEvent = screen.getByText(sampleEvent.title);
    fireEvent.click(dayWithEvent.closest('.calendar-cell'));
  
    expect(screen.getByText(/Edit Training Session/i)).toBeInTheDocument();
  
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);
      // Wait for deleteEvent mock to be called and modal to close
    await waitFor(() => {
      expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
      expect(mockDeleteEvent).toHaveBeenCalledWith(sampleEvent.id);
  
      expect(screen.queryByText(/Edit Training Session/i)).not.toBeInTheDocument();
    });
  });
  
  test('can close modal without changes', () => {
    render(<TrainingCalendar />);

    const dayWithEvent = screen.getByText(sampleEvent.title);
    fireEvent.click(dayWithEvent.closest('.calendar-cell'));

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Edit Training Session/i)).not.toBeInTheDocument();
  });

  test('can change month using header buttons and dropdown', () => {
    render(<TrainingCalendar />);

    const dropdown = screen.getByRole('combobox');

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    const valueAfterNext = dropdown.value;

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);
    fireEvent.click(prevButton);

    const valueAfterPrev = dropdown.value;

    expect(valueAfterNext).not.toEqual(valueAfterPrev);

    fireEvent.change(dropdown, { target: { value: '2024-0' } });

    expect(dropdown.value).toBe('2024-0');
  });
});
