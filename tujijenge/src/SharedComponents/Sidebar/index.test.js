import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './index';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <i className={`fa ${icon.iconName}`} />,
}));

describe('Sidebar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      
      }}
      >
        <Sidebar />
      </MemoryRouter>
    );
  });

  
  test('renders the sidebar with logo and navigation links', () => {
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const dashboardLink = screen.getByText('Dashboard');
    expect(dashboardLink).toBeInTheDocument();

    const calendarLink = screen.getByText('Calendar');
    expect(calendarLink).toBeInTheDocument();
  });

  test('activates the correct menu item on click', () => {
    const calendarLink = screen.getByText('Calendar').closest('.menu-icon');
    fireEvent.click(calendarLink);
    expect(calendarLink).toHaveClass('active');

    const dashboardLink = screen.getByText('Dashboard').closest('.menu-icon');
    expect(dashboardLink).not.toHaveClass('active');
  });

  test('renders the logout button', () => {
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  test('initializes with the dashboard as the active link', () => {
    const dashboardLink = screen.getByText('Dashboard').closest('.menu-icon');
    expect(dashboardLink).toHaveClass('active');
  });
});