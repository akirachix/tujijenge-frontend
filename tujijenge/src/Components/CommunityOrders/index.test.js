import React from 'react';
import { render, screen } from '@testing-library/react';
import CommunityOrders from './index';
import { MemoryRouter } from 'react-router-dom';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
test('renders Community Orders title', () => {
  render(
    <MemoryRouter>
      <CommunityOrders />
    </MemoryRouter>
  );
  expect(screen.getByText(/Community Orders/i)).toBeInTheDocument();
});
test('renders group buttons', () => {
  render(
    <MemoryRouter>
      <CommunityOrders />
    </MemoryRouter>
  );
  const viewButtons = screen.getAllByText(/View details/i);
  expect(viewButtons.length).toBeGreaterThan(1);
});