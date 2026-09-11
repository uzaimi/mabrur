import { expect, it } from 'vitest';
import { holySites } from '@/data/locations';
import { ArrivalDetector, type Fix } from './arrival';
const site = holySites.find(x => x.id === 'arafat')!;
const fix: Fix = { lat: site.lat, lng: site.lng, accuracy: 10, timestamp: 10000 };

it('waits for dwell, fires once, and rearms only after leaving', () => {
  const detector = new ArrivalDetector();
  expect(detector.step(fix, holySites, 10000)).toBeNull();
  expect(detector.step(fix, holySites, 17000)).toBeNull();
  expect(detector.step(fix, holySites, 18000)?.map(x => x.id)).toEqual(['arafat']);
  expect(detector.step({ ...fix, timestamp: 20000 }, holySites, 20000)).toBeNull();
  detector.step({ ...fix, lat: site.lat + .01, timestamp: 21000 }, holySites, 21000);
  expect(detector.step({ ...fix, timestamp: 22000 }, holySites, 22000)).toBeNull();
  expect(detector.step({ ...fix, timestamp: 30000 }, holySites, 30000)?.[0].id).toBe('arafat');
});
it('rejects poor, stale, invalid and future coordinates', () => {
  for (const invalid of [{ ...fix, accuracy: 80 }, { ...fix, timestamp: -10000 }, { ...fix, lat: NaN }, { ...fix, timestamp: 30000 }]) {
    const detector = new ArrivalDetector();
    detector.step(invalid, holySites, 10000);
    expect(detector.step(invalid, holySites, 18000)).toBeNull();
  }
});
it('offers multiple choices for overlapping Haram sites', () => {
  const kaaba = { ...fix, lat: 21.4225, lng: 39.8262 };
  const detector = new ArrivalDetector();
  detector.step(kaaba, holySites, 10000);
  const result = detector.step(kaaba, holySites, 18000)!;
  expect(result.map(x => x.id)).toEqual(expect.arrayContaining(['tawaf', 'multazam', 'first-sight-kaaba', 'maqam-ibrahim']));
});
it('requires the accuracy circle to fit within the radius', () => {
  const detector = new ArrivalDetector();
  const edge = { ...fix, lat: site.lat + .00075, accuracy: 30 };
  detector.step(edge, [site], 10000);
  expect(detector.step(edge, [site], 18000)).toBeNull();
});
it('does not re-trigger from boundary drift or poor GPS after arrival', () => {
  const detector = new ArrivalDetector();
  detector.step(fix, [site], 10000);
  detector.step(fix, [site], 18000);
  detector.step({ ...fix, lat: site.lat + .0012, timestamp: 19000 }, [site], 19000);
  detector.step(null, [site], 20000);
  detector.step({ ...fix, timestamp: 21000 }, [site], 21000);
  expect(detector.step({ ...fix, timestamp: 30000 }, [site], 30000)).toBeNull();
});
