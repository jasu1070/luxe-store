import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders LUXE logo', () => {
  render(<App />);
  const logoElement = screen.getByRole('button', { name: /LUXE Store home/i });
  expect(logoElement).toBeInTheDocument();
});

test('renders Home page by default', () => {
  render(<App />);
  const heroHeading = screen.getByText(/Premium Products For Modern Living/i);
  expect(heroHeading).toBeInTheDocument();
});

test('can navigate to About page', async () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /Site navigation/i });
  const aboutLink = within(nav).getByRole('button', { name: /About/i });
  aboutLink.click();
  const heading = await screen.findByRole('heading', { name: /Our Story/i });
  expect(heading).toBeInTheDocument();
});

test('can navigate to Contact page', async () => {
  render(<App />);
  const nav = screen.getByRole('navigation', { name: /Site navigation/i });
  const contactLink = within(nav).getByRole('button', { name: /Contact/i });
  contactLink.click();
  const heading = await screen.findByRole('heading', { name: /Get In Touch/i, level: 1 });
  expect(heading).toBeInTheDocument();
});

test('can navigate to Account page', async () => {
  render(<App />);
  const accountBtn = screen.getByRole('button', { name: /User account/i });
  accountBtn.click();
  const heading = await screen.findByRole('heading', { name: /Account Login/i });
  expect(heading).toBeInTheDocument();
});
