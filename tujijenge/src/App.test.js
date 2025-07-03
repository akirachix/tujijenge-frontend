import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Save button', () => {
  render(<App />);
  expect(screen.getByText('Save')).toBeInTheDocument();
});