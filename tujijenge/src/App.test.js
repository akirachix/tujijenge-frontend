import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});
function renderWithPath(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('App Routing', () => {
  it('renders CommunityOrders at "/"', () => {
    renderWithPath('/');
    expect(screen.getByText(/Community Orders/i)).toBeInTheDocument();
  });
  it('renders GroupOrders at "/group-orders"', () => {
    renderWithPath('/group-orders');
    expect(screen.getByText(/Group 1 Orders/i)).toBeInTheDocument();
  });
});






