import { useState, useCallback } from 'react';
import { HolySite } from '@/data/locations';

export interface GpsState {
  lat: number | null;
  lng: number | null;
  error: string | null;
  loading: boolean;
  active: boolean;
}

/** Haversine distance in meters between two lat/lng points */
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Format distance: "<1m", "350m", "1.2km" */
export function formatDistance(meters: number): string {
  if (meters < 1) return '<1m';
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function useGeolocation() {
  const [gps, setGps] = useState<GpsState>({
    lat: null,
    lng: null,
    error: null,
    loading: false,
    active: false,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGps((prev) => ({ ...prev, error: 'GPS tidak disokong oleh peranti ini.', loading: false }));
      return;
    }

    setGps((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
          active: true,
        });
      },
      (err) => {
        let msg = 'Tidak dapat mengesan lokasi.';
        if (err.code === 1) msg = 'Akses lokasi dinafikan. Sila benarkan di tetapan pelayar.';
        if (err.code === 2) msg = 'Isyarat GPS terlalu lemah.';
        if (err.code === 3) msg = 'Masa tamat. Cuba lagi.';
        setGps((prev) => ({ ...prev, error: msg, loading: false, active: false }));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setGps({ lat: null, lng: null, error: null, loading: false, active: false });
  }, []);

  /** Sort sites by distance from current GPS position */
  const sortByProximity = useCallback(
    (sites: HolySite[]): HolySite[] => {
      if (!gps.lat || !gps.lng) return sites;
      return [...sites].sort(
        (a, b) => haversine(gps.lat!, gps.lng!, a.lat, a.lng) - haversine(gps.lat!, gps.lng!, b.lat, b.lng)
      );
    },
    [gps.lat, gps.lng]
  );

  /** Distance to a site in meters */
  const distanceTo = useCallback(
    (site: HolySite): number | null => {
      if (!gps.lat || !gps.lng) return null;
      return haversine(gps.lat, gps.lng, site.lat, site.lng);
    },
    [gps.lat, gps.lng]
  );

  return { gps, requestLocation, clearLocation, sortByProximity, distanceTo };
}
