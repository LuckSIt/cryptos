import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main landmark', () => {
  render(<App />);
  expect(document.querySelector('main')).toBeInTheDocument();
});
