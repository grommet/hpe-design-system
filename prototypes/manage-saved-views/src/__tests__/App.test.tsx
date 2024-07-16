import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../config', () => ({
  config: {
    loginCredential: 'mock',
    loginKey: 'mock',
  },
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('App', () => {
  test('renders App login', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'HPE Design Tokens Demo' })).toBeInTheDocument();
  });

  test('should allow user to login', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText('Password', { exact: false });
    expect(passwordInput).toBeInTheDocument();

    await user.click(passwordInput);
    await user.type(passwordInput, 'mock');
    expect(passwordInput).toHaveValue('mock');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});