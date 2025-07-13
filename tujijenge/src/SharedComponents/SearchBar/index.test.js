import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';
describe('SearchBar Component', () => {
  it('renders with correct placeholder and value', () => {
    render(<SearchBar searchTerm="Kilimani" setSearchTerm={() => {}} />);
    const input = screen.getByPlaceholderText(
      'Search by group name, date, or order id'
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Kilimani');
  });
  it('calls setSearchTerm on input change', () => {
    const setSearchTermMock = jest.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTermMock} />);
    const input = screen.getByPlaceholderText(/search by group name/i);
    fireEvent.change(input, { target: { value: 'Nairobi' } });
    expect(setSearchTermMock).toHaveBeenCalledWith('Nairobi');
    expect(setSearchTermMock).toHaveBeenCalledTimes(1);
  });
});



