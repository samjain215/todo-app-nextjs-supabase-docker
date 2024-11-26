// Look at the naming convention of this Test File... You need
// ------- Component.test.tsx ---------

//Watch the video link below:
//https://www.youtube.com/watch?v=g3GFZx1KyWs


// UI Testing (Check whether there are headers as expected or correct color of the button)

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Login from '../app/login/page'

// Tests if the page is rendering a input box for email
describe('Login', () => {
    it('renders a textbox for email', () => {
        render(<Login />)

        const inputBox = screen.getByRole('textbox')
        expect(inputBox).toBeInTheDocument();
    })
});

// Tests if the page is rendering a input box that has a type = 'email'
describe('Login Test2', () => {
    it('renders a textbox that has a type email', () => {
        render(<Login />)

        const inputBox = screen.getByRole('textbox')
        expect(inputBox).toHaveAttribute('type', 'email');
    })
});

//API Testing using mock templates

