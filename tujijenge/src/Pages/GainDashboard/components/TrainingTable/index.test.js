import { render, screen } from '@testing-library/react';
import TrainingTable from './index';

describe('TrainingTable Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the table with correct headers', () => {
    render(<TrainingTable />);

    // Check that the table is rendered
    expect(screen.getByRole('table')).toHaveClass('training-table');

    // Check that all headers are rendered correctly
    const headers = [
      'Training Sessions',
      'Location',
      'Communities',
      'Registered',
      'starting-date',
      'ending-date',
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders the correct number of rows based on sessions data', () => {
    render(<TrainingTable />);

    // There are 5 sessions, so expect 5 rows in the tbody
    const rows = screen.getAllByRole('row');
    // Total rows = 1 header row + 5 data rows
    expect(rows).toHaveLength(6);
  });

  test('displays session data correctly in table rows', () => {
    render(<TrainingTable />);

    // Check the content of the first row (index 0 in sessions array)
    const firstRowCells = screen.getAllByRole('row')[1].querySelectorAll('td'); // Skip header row
    expect(firstRowCells[0]).toHaveTextContent('Hygiene and sanitation');
    expect(firstRowCells[1]).toHaveTextContent('Juja, Nairobi');
    expect(firstRowCells[2]).toHaveTextContent('Community 1');
    expect(firstRowCells[3]).toHaveTextContent('9');
    expect(firstRowCells[4]).toHaveTextContent('10-12-2025');
    expect(firstRowCells[5]).toHaveTextContent('20-12-2025');

    // Check that all rows have the same data (since all sessions are identical)
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    rows.forEach((row) => {
      expect(row).toHaveTextContent('Hygiene and sanitation');
      expect(row).toHaveTextContent('Juja, Nairobi');
      expect(row).toHaveTextContent('Community 1');
      expect(row).toHaveTextContent('9');
      expect(row).toHaveTextContent('10-12-2025');
      expect(row).toHaveTextContent('20-12-2025');
    });
  });

  test('applies even-row and odd-row classes correctly', () => {
    render(<TrainingTable />);

    // Get all data rows (skip header row)
    const rows = screen.getAllByRole('row').slice(1);

    // Check alternating classes
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        expect(row).toHaveClass('even-row');
        expect(row).not.toHaveClass('odd-row');
      } else {
        expect(row).toHaveClass('odd-row');
        expect(row).not.toHaveClass('even-row');
      }
    });
  });

  test('renders horizontal-line divs', () => {
    render(<TrainingTable />);

    // Check that two horizontal-line divs are rendered
    const horizontalLines = screen.getAllByTestId('horizontal-line', { selector: 'div.horizontal-line' });
    expect(horizontalLines).toHaveLength(2);
  });

  test('renders correctly with empty sessions array', () => {
    // Mock the sessions array to be empty
    jest.spyOn(global, 'sessions').mockReturnValue([]);

    render(<TrainingTable />);

    // Expect only the header row
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1); // Only header row
    expect(screen.getByRole('table')).toHaveClass('training-table');
    expect(screen.getAllByTestId('horizontal-line', { selector: 'div.horizontal-line' })).toHaveLength(2);
  });
});