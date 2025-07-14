import { render, screen, fireEvent } from '@testing-library/react';
import Notification, { NotificationDropdown, NotificationItem } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Mock FontAwesomeIcon to avoid rendering actual SVG
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }) => <span className={className} data-testid="bell-icon" />,
}));

describe('Notification Component', () => {
  const mockNotifications = [
    { message: 'Notification 1' },
    { message: 'Notification 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the bell icon', () => {
    render(<Notification notifications={mockNotifications} />);
    expect(screen.getByTestId('bell-icon')).toHaveClass('bell');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('displays notification badge with correct count', () => {
    render(<Notification notifications={mockNotifications} />);
    expect(screen.getByText('2')).toHaveClass('notification-badge');
  });

  test('does not display notification badge when notifications are empty', () => {
    render(<Notification notifications={[]} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(screen.queryByTestId('notification-badge')).not.toBeInTheDocument();
  });

  test('toggles dropdown visibility when bell is clicked', () => {
    render(<Notification notifications={mockNotifications} />);

    // Initially, dropdown should not be visible
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();

    // Click the bell to open the dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('dropdown')).toHaveClass('dropdown');

    // Click again to close the dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  test('renders notifications in dropdown when open', () => {
    render(<Notification notifications={mockNotifications} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));

    // Check that notifications are rendered
    expect(screen.getByText('Notification 1')).toHaveClass('list');
    expect(screen.getByText('Notification 2')).toHaveClass('list');
  });

  test('displays "No new notifications" when notifications are empty and dropdown is open', () => {
    render(<Notification notifications={[]} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));

    // Check for empty message
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', () => {
    render(<Notification notifications={mockNotifications} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    // Simulate clicking outside (on document)
    fireEvent.mouseDown(document);
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  test('does not close dropdown when clicking inside dropdown', () => {
    render(<Notification notifications={mockNotifications} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));
    const dropdown = screen.getByTestId('dropdown');

    // Click inside the dropdown
    fireEvent.mouseDown(dropdown);
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });

  test('does not close dropdown when clicking the bell', () => {
    render(<Notification notifications={mockNotifications} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    // Click the bell again
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument(); // Should toggle off
  });
});

// Tests for NotificationItem component
describe('NotificationItem Component', () => {
  test('renders notification message with correct class', () => {
    render(<NotificationItem message="Test notification" />);
    expect(screen.getByText('Test notification')).toHaveClass('list');
  });
});

// Tests for NotificationDropdown component
describe('NotificationDropdown Component', () => {
  test('does not render when isOpen is false', () => {
    render(<NotificationDropdown notifications={[]} isOpen={false} />);
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  test('renders notifications when isOpen is true', () => {
    const notifications = [{ message: 'Test 1' }, { message: 'Test 2' }];
    render(<NotificationDropdown notifications={notifications} isOpen={true} />);
    expect(screen.getByTestId('dropdown')).toHaveClass('dropdown');
    expect(screen.getByText('Test 1')).toHaveClass('list');
    expect(screen.getByText('Test 2')).toHaveClass('list');
  });

  test('renders "No new notifications" when notifications are empty and isOpen is true', () => {
    render(<NotificationDropdown notifications={[]} isOpen={true} />);
    expect(screen.getByTestId('dropdown')).toHaveClass('dropdown');
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });
});