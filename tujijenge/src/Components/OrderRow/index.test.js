import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderRow from './index';
const mockOrder = {
  community: 'Greenville',
  date: '2025-07-12',
  location: 'Nairobi',
  amount: 3,
  total: 1200,
  products: ['Tomatoes', 'Onions', 'Spinach'],
};
describe('OrderRow Component', () => {
  it('renders basic order info', () => {
    render(<OrderRow order={mockOrder} className="even-row" />);
    expect(screen.getByText('Greenville')).toBeInTheDocument();
    expect(screen.getByText('2025-07-12')).toBeInTheDocument();
    expect(screen.getByText('Nairobi')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Ksh 1200')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });
  it('toggles details when button is clicked', () => {
    render(<OrderRow order={mockOrder} className="odd-row" />);
    const button = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(button);
   
    expect(screen.getByText('Products:')).toBeInTheDocument();
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText('Spinach')).toBeInTheDocument();
 
    expect(button.textContent).toMatch(/hide details/i);

    fireEvent.click(button);
    expect(screen.queryByText('Tomatoes')).not.toBeInTheDocument();
  });
  it('applies the correct className', () => {
    const { container } = render(<OrderRow order={mockOrder} className="odd-row" />);
    const row = container.querySelector('.order-row');
    expect(row.classList.contains('odd-row')).toBe(true);
  });
});