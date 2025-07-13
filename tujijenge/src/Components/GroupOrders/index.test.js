import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupOrders from './index';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as data from '../../data';
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => jest.fn(),
    useParams: () => ({ groupId: '1' }),
  };
});
describe('GroupOrders Component', () => {
  beforeEach(() => {

    data.groupOrdersData = [
      {
        id: 1,
        groupId: 1,
        customer: 'Alice',
        amount: 1500,
        date: '2025-07-01',
        items: 3,
        status: 'Delivered',
      },
      {
        id: 2,
        groupId: 1,
        customer: 'Bob',
        amount: 2300,
        date: '2025-07-02',
        items: 5,
        status: 'Pending',
      },
    ];
  });
  it('renders correct group title and order rows', () => {
    render(
      <MemoryRouter initialEntries={['/group-orders/1']}>
        <Routes>
          <Route path="/group-orders/:groupId" element={<GroupOrders />} />
        </Routes>
      </MemoryRouter>
    );
 
    expect(screen.getByText('Group 1 Orders')).toBeInTheDocument();

    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Total Amount')).toBeInTheDocument();
 
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});









