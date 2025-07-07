import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './index';

jest.mock('./style.css', () => ({}));

describe('Input Component', () => {
  test('input field matches provided value', () => {
    render(<Input id="test-input" label="Username" value="test" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });
});