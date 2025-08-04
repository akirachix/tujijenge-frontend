import { render, screen } from '@testing-library/react';
import EventCalendar from './index';
import { useEvents } from '../../../context/useEvents';

jest.mock('../../../context/useEvents', () => ({
  useEvents: jest.fn(),
}));

// Mock react-calendar to render tileContent for specific dates
jest.mock('react-calendar', () => {
  return function MockCalendar({ tileContent }) {
    return (
      <div>
        {tileContent({ date: new Date('2025-07-01T12:00:00.000Z'), view: 'month' })}
        {tileContent({ date: new Date('2025-07-15T12:00:00.000Z'), view: 'month' })}
      </div>
    );
  };
});

describe('EventCalendar', () => {
  test('renders events from context on the calendar', () => {
    useEvents.mockReturnValue({
      events: [
        { id: '1', title: 'Health', startDate: '2025-07-01T12:00:00.000Z' },   // <-- Use startDate
        { id: '2', title: 'Nutrition', startDate: '2025-07-15T12:00:00.000Z' },
      ],
    });

    render(<EventCalendar />);

    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
  });

  test('handles events with invalid dates gracefully', () => {
    useEvents.mockReturnValue({
      events: [
        { id: '1', title: 'Valid Event', startDate: '2025-07-01T12:00:00.000Z' },
        { id: '2', title: 'Invalid Event', startDate: 'invalid-date' },
      ],
    });

    render(<EventCalendar />);

    expect(screen.getByText('Valid Event')).toBeInTheDocument();
    expect(screen.queryByText('Invalid Event')).not.toBeInTheDocument();
  });
});
