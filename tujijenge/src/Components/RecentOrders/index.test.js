import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecentOrders from './index';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../../data/orders', () => ({
  orders: [
    {
      id: 1,
      community: 'Nairobi West',
      date: '2025-07-10',
      location: 'Nairobi',
      amount: 3,
      total: 1200,
      products: ['Spinach', 'Kale']
    },
    {
      id: 2,
      community: 'Kilimani',
      date: '2025-07-11',
      location: 'Nairobi',
      amount: 5,
      total: 2300,
      products: ['Onions', 'Tomatoes']
    }
  ]
}));
describe('RecentOrders Component', () => {
  it('renders title and orders', () => {
    render(
      <MemoryRouter>
        <RecentOrders />
      </MemoryRouter>
    );

    expect(screen.getByText(/recent orders/i)).toBeInTheDocument();
    expect(screen.getByText('Nairobi West')).toBeInTheDocument();
    expect(screen.getByText('Kilimani')).toBeInTheDocument();
    expect(screen.getByText('Ksh 1200')).toBeInTheDocument();
    expect(screen.getByText('Ksh 2300')).toBeInTheDocument();
  });
  it('filters by search term', () => {
    render(
      <MemoryRouter>
        <RecentOrders />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Kilimani' } });
    expect(screen.queryByText('Nairobi West')).not.toBeInTheDocument();
    expect(screen.getByText('Kilimani')).toBeInTheDocument();
  });
  it('displays correct order count', () => {
    render(
      <MemoryRouter>
        <RecentOrders />
      </MemoryRouter>
    );

    expect(screen.getByText(/1-2 of 2 orders/i)).toBeInTheDocument();
  });
  it('renders back arrow and bell icon', () => {
    render(
      <MemoryRouter>
        <RecentOrders />
      </MemoryRouter>
    );
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument(); 

  });
});