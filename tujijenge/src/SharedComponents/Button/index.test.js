import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

test('renders the button', () => {
  render(<Button label="Click me" />);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});
