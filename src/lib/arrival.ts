import type { HolySite } from '@/data/locations';
import { haversine } from '@/hooks/useGeolocation';

export interface Fix { lat: number; lng: number; accuracy: number; timestamp: number }
export const ARRIVAL = { enter: 100, exit: 180, accuracy: 50, dwell: 8000, maxAge: 15000 };

// These are proximity hints around catalogue points, not ritual boundaries.
export class ArrivalDetector {
  private notified = new Set<string>();
  private pending: { key: string; since: number } | null = null;

  step(fix: Fix | null, sites: HolySite[], now: number): HolySite[] | null {
    if (!fix || ![fix.lat, fix.lng, fix.accuracy, fix.timestamp].every(Number.isFinite)
      || Math.abs(fix.lat) > 90 || Math.abs(fix.lng) > 180 || fix.accuracy < 0
      || fix.accuracy > ARRIVAL.accuracy || now - fix.timestamp > ARRIVAL.maxAge || fix.timestamp > now) {
      this.pending = null;
      return null;
    }
    const distances = sites.map(site => ({ site, distance: haversine(fix.lat, fix.lng, site.lat, site.lng) }));
    for (const { site, distance } of distances) {
      if (distance - fix.accuracy > ARRIVAL.exit) this.notified.delete(site.id);
    }
    // Require the uncertainty circle to fit within the entry radius of at least one site.
    const inside = distances.filter(x => x.distance + fix.accuracy <= ARRIVAL.enter);
    if (!inside.some(x => !this.notified.has(x.site.id))) { this.pending = null; return null; }
    // Nearby overlapping sites remain choices rather than a false precise arrival.
    const candidates = distances.filter(x => x.distance - fix.accuracy <= ARRIVAL.enter)
      .sort((a, b) => a.distance - b.distance).map(x => x.site);
    const key = candidates.map(x => x.id).sort().join(',');
    if (this.pending?.key !== key) { this.pending = { key, since: now }; return null; }
    if (now - this.pending.since < ARRIVAL.dwell) return null;
    candidates.forEach(site => this.notified.add(site.id));
    this.pending = null;
    return candidates;
  }
}
