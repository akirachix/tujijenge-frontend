import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupOrders from './index';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../../data', () => ({
  groupOrdersData: [
    {
      id: '1',
      customer: 'John Doe',
      amount: '$100',
      date: '2025-07-06',
      items: 3,
      status: 'Delivered',
    },
  ],
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
test('renders Group Orders title', () => {
  render(
    <MemoryRouter>
      <GroupOrders />
    </MemoryRouter>
  );
  expect(screen.getByText(/Group 1 Orders/i)).toBeInTheDocument();
});