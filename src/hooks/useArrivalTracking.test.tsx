import { act, cleanup, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useArrivalTracking } from './useArrivalTracking';
import App from '@/App';

const watch = vi.fn();
const clear = vi.fn();
beforeEach(() => {
  vi.useFakeTimers();
  watch.mockReset().mockReturnValue(7);
  clear.mockReset();
  vi.stubGlobal('navigator', { geolocation: { watchPosition: watch, clearWatch: clear } });
  vi.stubGlobal('isSecureContext', true);
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function report(lat: number, lng: number, call = 0) {
  act(() => watch.mock.calls[call][0]({ coords: { latitude: lat, longitude: lng, accuracy: 10 }, timestamp: Date.now() }));
}

it('starts only with consent, clears the watch, and ignores late callbacks', () => {
  const { result, unmount } = renderHook(useArrivalTracking);
  expect(watch).not.toHaveBeenCalled();
  act(() => result.current.start());
  expect(watch).toHaveBeenCalledOnce();
  act(() => result.current.stop());
  expect(clear).toHaveBeenCalledWith(7);
  report(21.3547, 39.9839);
  act(() => vi.advanceTimersByTime(10000));
  expect(result.current.arrival).toBeNull();
  act(() => result.current.start());
  unmount();
  expect(clear).toHaveBeenCalledTimes(2);
});
it('pauses while hidden and requires a fresh fix after resuming', () => {
  const { result } = renderHook(useArrivalTracking);
  act(() => result.current.start());
  report(21.3547, 39.9839);
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(clear).toHaveBeenCalledWith(7);
  act(() => vi.advanceTimersByTime(10000));
  expect(result.current.arrival).toBeNull();
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(watch).toHaveBeenCalledTimes(2);
  report(21.3547, 39.9839, 0);
  act(() => vi.advanceTimersByTime(9000));
  expect(result.current.arrival).toBeNull();
  report(21.3547, 39.9839, 1);
  act(() => vi.advanceTimersByTime(9000));
  expect(result.current.arrival?.sites[0].id).toBe('arafat');
});
it('stops on permission denial and allows retry', () => {
  const { result } = renderHook(useArrivalTracking);
  act(() => result.current.start());
  act(() => watch.mock.calls[0][1]({ code: 1 }));
  expect(result.current.enabled).toBe(false);
  expect(result.current.error).toContain('dinafikan');
  act(() => result.current.start());
  expect(watch).toHaveBeenCalledTimes(2);
});
it('opens the relevant reading on arrival even when search excludes it', () => {
  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Miqat' } });
  fireEvent.click(screen.getByRole('button', { name: 'Aktifkan pengesanan ketibaan' }));
  report(21.3547, 39.9839);
  act(() => vi.advanceTimersByTime(9000));
  const region = within(screen.getByRole('region', { name: 'Pengesanan ketibaan' }));
  expect(region.getByText('Zikir Terbaik Hari Arafat')).toBeTruthy();
  fireEvent.click(region.getByRole('button', { name: 'Tutup cadangan ketibaan' }));
  report(21.3547, 39.9839);
  act(() => vi.advanceTimersByTime(10000));
  expect(region.queryByText('Zikir Terbaik Hari Arafat')).toBeNull();
});
it('asks the user to choose a site in overlapping areas', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Aktifkan pengesanan ketibaan' }));
  report(21.4225, 39.8262);
  act(() => vi.advanceTimersByTime(9000));
  const region = within(screen.getByRole('region', { name: 'Pengesanan ketibaan' }));
  expect(region.queryByText('Doa di Multazam')).toBeNull();
  fireEvent.click(region.getByRole('button', { name: 'Multazam' }));
  expect(region.getByText('Doa di Multazam')).toBeTruthy();
});
