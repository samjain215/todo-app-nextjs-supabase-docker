import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '../app/login/page'

// Tests if the page is rendering a input box for email
describe('Login', () => {
    it('renders a textbox for email', () => {
        render(<Login />)

        const inputBox = screen.getByTestId('__email__')
        expect(inputBox).toBeInTheDocument();
        expect(inputBox).toHaveAttribute('type', 'email');
    })
});