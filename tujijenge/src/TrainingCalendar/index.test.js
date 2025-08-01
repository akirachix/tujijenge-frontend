// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import TrainingCalendar from './index';
// import { useEvents } from '../context/useEvents';
// import { format } from 'date-fns';

// // Mock your useEvents hook
// jest.mock('../context/useEvents');

// describe('TrainingCalendar', () => {
//   let mockAddEvent, mockUpdateEvent, mockDeleteEvent;

//   // A helper event for tests
//   const sampleEvent = {
//     id: '1',
//     title: 'Sample Event',
//     startDate: '2025-07-15T00:00:00.000Z',
//     start_date: '2025-07-15', // fallback name used in eventData
//     location: 'Test Location',
//   };

//   beforeEach(() => {
//     mockAddEvent = jest.fn();
//     mockUpdateEvent = jest.fn();
//     mockDeleteEvent = jest.fn();

//     // Provide initial events and mocks
//     useEvents.mockReturnValue({
//       events: [sampleEvent],
//       addEvent: mockAddEvent,
//       updateEvent: mockUpdateEvent,
//       deleteEvent: mockDeleteEvent,
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });



//   test('renders a day cell with event and can open modal on click', () => {
//     render(<TrainingCalendar />);

//     // Find the cell with event title text (event.title renders inside cell)
//     const dayWithEvent = screen.getByText(sampleEvent.title);

//     expect(dayWithEvent).toBeInTheDocument();

//     // Click the cell to open modal
//     fireEvent.click(dayWithEvent.closest('.calendar-cell'));

//     // Modal should open with Edit Training Session header
//     expect(screen.getByText(/Edit Training Session/i)).toBeInTheDocument();

//     // The input should have initial title value prefilled
//     const input = screen.getByLabelText(/Title:/i);
//     expect(input).toHaveValue(sampleEvent.title);
//   });


//   test('can delete an existing event', async () => {
//     render(<TrainingCalendar />);

//     // Open modal by clicking on the cell with the event
//     const dayWithEvent = screen.getByText(sampleEvent.title);
//     fireEvent.click(dayWithEvent.closest('.calendar-cell'));

//     expect(screen.getByText(/Edit Training Session/i)).toBeInTheDocument();

//     // Click Delete button
//     const deleteButton = screen.getByRole('button', { name: /Delete/i });
//     fireEvent.click(deleteButton);

//     // deleteEvent should be called with event id
//     await waitFor(() => {
//       expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
//       expect(mockDeleteEvent).toHaveBeenCalledWith(sampleEvent.id);
//     });

//     // Modal closes
//     expect(screen.queryByText(/Edit Training Session/i)).not.toBeInTheDocument();
//   });

//   test('can close modal without changes', () => {
//     render(<TrainingCalendar />);

//     // Open modal by clicking event cell
//     const dayWithEvent = screen.getByText(sampleEvent.title);
//     fireEvent.click(dayWithEvent.closest('.calendar-cell'));

//     // Click Cancel button
//     const cancelButton = screen.getByRole('button', { name: /Cancel/i });
//     fireEvent.click(cancelButton);

//     // Modal should no longer be present
//     expect(screen.queryByText(/Edit Training Session/i)).not.toBeInTheDocument();
//   });

//   test('can change month using header buttons and dropdown', () => {
//     render(<TrainingCalendar />);

//     // Initial month name in dropdown
//     const dropdown = screen.getByRole('combobox');

//     // Click next month button
//     const nextButton = screen.getByText('>');
//     fireEvent.click(nextButton);

//     // The month/year value in dropdown should update (simulate by checking value change)
//     // Parse value attribute on dropdown: "YYYY-MM"
//     const valueAfterNext = dropdown.value;

//     // Click prev month button
//     const prevButton = screen.getByText('<');
//     fireEvent.click(prevButton);
//     fireEvent.click(prevButton); // go 2 months back

//     const valueAfterPrev = dropdown.value;

//     // The values should differ (at least)
//     expect(valueAfterNext).not.toEqual(valueAfterPrev);

//     // Manually select a different month and year
//     fireEvent.change(dropdown, { target: { value: '2024-0' } }); // January 2024

//     expect(dropdown.value).toBe('2024-0');
//   });
// });
