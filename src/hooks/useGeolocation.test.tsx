import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useGeolocation } from './useGeolocation';
import { holySites } from '@/data/locations';

const locate = vi.fn();
beforeEach(() => {
  locate.mockReset();
  vi.stubGlobal('navigator', { geolocation: { getCurrentPosition: locate } });
  vi.stubGlobal('isSecureContext', true);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const position = (latitude: number, longitude: number) => ({ coords: { latitude, longitude, accuracy: 25 } });

it('does not request GPS on mount and requests fresh coordinates on demand', () => {
  const { result } = renderHook(useGeolocation);
  expect(locate).not.toHaveBeenCalled();
  act(() => result.current.requestLocation());
  expect(locate.mock.calls[0][2]).toEqual({ enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  act(() => locate.mock.calls[0][0](position(21.4225, 39.8262)));
  expect(result.current.gps.accuracy).toBe(25);
  expect(result.current.gps.active).toBe(true);
});
it('ignores callbacks after cancelling location detection', () => {
  const { result } = renderHook(useGeolocation);
  act(() => result.current.requestLocation());
  act(() => result.current.clearLocation());
  act(() => locate.mock.calls[0][0](position(21, 39)));
  expect(result.current.gps).toMatchObject({ active: false, loading: false, lat: null });
});
it('ignores an older request after a newer one succeeds', () => {
  const { result } = renderHook(useGeolocation);
  act(() => result.current.requestLocation());
  act(() => result.current.requestLocation());
  act(() => locate.mock.calls[1][0](position(24, 39)));
  act(() => locate.mock.calls[0][1]({ code: 1 }));
  expect(result.current.gps).toMatchObject({ active: true, lat: 24, error: null });
});
it('clears old distances when a refresh fails', () => {
  const { result } = renderHook(useGeolocation);
  act(() => result.current.requestLocation());
  act(() => locate.mock.calls[0][0](position(21, 39)));
  act(() => result.current.requestLocation());
  act(() => locate.mock.calls[1][1]({ code: 1 }));
  expect(result.current.distanceTo(holySites[0])).toBeNull();
  expect(result.current.gps.error).toContain('dinafikan');
});
it('accepts zero-valued coordinates and sorts without mutating the data', () => {
  const { result } = renderHook(useGeolocation);
  act(() => result.current.requestLocation());
  act(() => locate.mock.calls[0][0](position(0, 0)));
  const sites = [{ ...holySites[0], lat: 1, lng: 1 }, { ...holySites[1], lat: 0, lng: 0 }];
  expect(result.current.distanceTo(sites[1])).toBe(0);
  expect(result.current.sortByProximity(sites)[0]).toBe(sites[1]);
  expect(sites[0].lat).toBe(1);
});
it('explains insecure pages without prompting for GPS', () => {
  vi.stubGlobal('isSecureContext', false);
  const { result } = renderHook(useGeolocation);
  act(() => result.current.requestLocation());
  expect(result.current.gps.error).toContain('HTTPS');
  expect(locate).not.toHaveBeenCalled();
});
