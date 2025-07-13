import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
// Helper to render App at a given path
function renderWithPath(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}
describe('App Routing', () => {
  it('renders CommunityOrders at "/"', () => {
    renderWithPath('/');
    expect(screen.getByText(/Community Orders/i)).toBeInTheDocument();
  });
  it('renders GroupOrders at "/group-orders/:groupId"', () => {
    renderWithPath('/group-orders/1');
    expect(screen.getByText(/Group 1 Orders/i)).toBeInTheDocument();
  });
  it('renders RecentOrders at "/history"', () => {
    renderWithPath('/history');
    expect(screen.getByText(/Recent Orders/i)).toBeInTheDocument();
  });
});