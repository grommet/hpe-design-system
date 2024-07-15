import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders App', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'HPE Design Tokens Demo' })).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password', { exact: false });
    expect(passwordInput).toBeInTheDocument();
    screen.debug(passwordInput);
  });
});