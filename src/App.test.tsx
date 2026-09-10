import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('trims search text and exposes an operable expansion button', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Cari lokasi' }), { target: { value: '  Maqam Ibrahim  ' } });
  const button = screen.getByRole('button', { name: /Maqam Ibrahim/ });
  expect(button.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(button);
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByText('Surah Al-Kafirun (Rakaat 1)')).toBeTruthy();
});
it('keeps the reading card and copy button mounted after copying', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Miqat \(Zul Hulaifah/ }));
  const copy = screen.getByRole('button', { name: 'Salin teks Arab: Talbiyah' });
  fireEvent.click(copy);
  await waitFor(() => expect(screen.getByRole('status').textContent).toContain('disalin'));
  expect(copy.isConnected).toBe(true);
  expect(writeText).toHaveBeenCalledOnce();
});
it('handles clipboard rejection without closing the reading', async () => {
  vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('Denied')) } });
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Miqat \(Zul Hulaifah/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Salin teks Arab: Talbiyah' }));
  expect((await screen.findByRole('alert')).textContent).toContain('secara manual');
  expect(screen.getByText('Talbiyah')).toBeTruthy();
});
it('labels incomplete readings as excerpts', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Padang Arafat/ }));
  expect(screen.getAllByText(/Petikan sahaja/)).toHaveLength(2);
});
