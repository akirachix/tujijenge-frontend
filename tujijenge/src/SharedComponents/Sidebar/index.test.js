import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }) => (
    <span className={className} data-test-id={`icon-${icon.iconName}`} />
  ),
}));


process.env.PUBLIC_URL = '/public';

describe('Sidebar Component', () => {
  const toggleSidebar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders toggle button with faBars icon when collapsed', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon-bars')).toHaveClass('sidebar-toggle-btn');
    expect(screen.queryByTestId('icon-times')).not.toBeInTheDocument();
  });

  test('renders toggle button with faTimes icon when expanded', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon-times')).toHaveClass('x');
    expect(screen.queryByTestId('icon-bars')).not.toBeInTheDocument();
  });

  test('calls toggleSidebar when toggle button is clicked', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('icon-bars'));
    expect(toggleSidebar).toHaveBeenCalledTimes(1);
  });

  test('renders logo when sidebar is expanded', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo');
    expect(logo).toHaveAttribute('src', '/public/Images/logo.png');
    expect(logo).toHaveClass('sidebar-logo');
  });

  test('does not render logo when sidebar is collapsed', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
  });

  test('renders menu items with correct icons and links', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon-house')).toHaveClass('Calendar');
    expect(screen.getByTestId('icon-calendar')).toHaveClass('Calendar');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Calendar/i })).toHaveAttribute('href', '/calendar');
  });

  test('does not render menu item labels when collapsed', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument();
    expect(screen.getByTestId('icon-house')).toBeInTheDocument();
    expect(screen.getByTestId('icon-calendar')).toBeInTheDocument();
  });

  test('sets active class on dashboard menu item by default', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    const dashboardMenu = screen.getByRole('link', { name: /Dashboard/i }).parentElement;
    expect(dashboardMenu).toHaveClass('menu-icon active');
    const calendarMenu = screen.getByRole('link', { name: /Calendar/i }).parentElement;
    expect(calendarMenu).toHaveClass('menu-icon');
    expect(calendarMenu).not.toHaveClass('active');
  });

  test('sets active class on calendar menu item when clicked', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    const calendarMenu = screen.getByRole('link', { name: /Calendar/i }).parentElement;
    fireEvent.click(calendarMenu);
    expect(calendarMenu).toHaveClass('menu-icon active');
    const dashboardMenu = screen.getByRole('link', { name: /Dashboard/i }).parentElement;
    expect(dashboardMenu).toHaveClass('menu-icon');
    expect(dashboardMenu).not.toHaveClass('active');
  });

  test('renders logout section with icon and label when expanded', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon-power-off')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Logout').parentElement).toHaveClass('sidebar-logout');
  });

  test('renders logout icon but not label when collapsed', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon-power-off')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders sidebar with correct class based on isCollapsed prop', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('sidebar')).toHaveClass('sidebar-collapsed');

    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} toggleSidebar={toggleSidebar} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('sidebar')).toHaveClass('sidebar-expanded');
  });
});