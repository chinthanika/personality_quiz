import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
test('renders a quiz question', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
  // Update this to match a known text element from your App component
  const questionElement = screen.getByText(/Do you enjoy being the center of attention?/i);
  expect(questionElement).toBeInTheDocument();
});
