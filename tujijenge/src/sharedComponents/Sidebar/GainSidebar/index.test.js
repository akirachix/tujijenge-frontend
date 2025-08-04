import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './index';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => <i className={`fa ${icon.iconName}`} />,
}));
const suppressReactRouterFutureFlagWarnings = (message) => {
  return (
    message.includes('React Router Future Flag Warning') ||
    message.includes('v7_startTransition') ||
    message.includes('v7_relativeSplatPath')
  );
};


const originalWarn = console.warn;

console.warn = (...args) => {
  const [message] = args;
  if (typeof message === 'string' && suppressReactRouterFutureFlagWarnings(message)) {

    return;
  }
  originalWarn(...args);
};

describe('Sidebar', () => {
  test('renders the sidebar with logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  test('renders the logout button', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('initializes with the dashboard as the active link', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Sidebar />
      </MemoryRouter>
    );
    const dashboardLink = screen.getByText('Dashboard').closest('.menu-icon');
    expect(dashboardLink).toHaveClass('active');
    const calendarLink = screen.getByText('Calendar').closest('.menu-icon');
    expect(calendarLink).not.toHaveClass('active');
  });

  test('initializes with the calendar as the active link', () => {
    render(
      <MemoryRouter initialEntries={['/training-calendar']}>
        <Sidebar />
      </MemoryRouter>
    );
    const dashboardLink = screen.getByText('Dashboard').closest('.menu-icon');
    expect(dashboardLink).not.toHaveClass('active');
    const calendarLink = screen.getByText('Calendar').closest('.menu-icon');
    expect(calendarLink).toHaveClass('active');
  });
});