import { render } from '@testing-library/react';
import React from 'react';
import './button'


describe( 'Button Component', () => {
    test('renders button with provided label', () => {
        render (<Button label = "Click me"/>);
         const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Click Me');
    });
    test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
        });
}
)