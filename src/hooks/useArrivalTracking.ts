import { useEffect, useRef, useState } from 'react';
import { holySites, type HolySite } from '@/data/locations';
import { ARRIVAL, ArrivalDetector, type Fix } from '@/lib/arrival';

export function useArrivalTracking() {
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [arrival, setArrival] = useState<{ sites: HolySite[]; sequence: number } | null>(null);
  const sequence = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let generation = 0;
    let watch: number | null = null;
    let fix: Fix | null = null;
    const detector = new ArrivalDetector();
    const stopWatch = () => {
      generation += 1;
      if (watch !== null) navigator.geolocation.clearWatch(watch);
      watch = null;
      fix = null;
      detector.step(null, holySites, Date.now());
    };
    const startWatch = () => {
      stopWatch();
      if (disposed) return;
      setPaused(document.hidden);
      if (document.hidden) { setArrival(null); setNotice('Dijeda — buka semula aplikasi untuk meneruskan.'); return; }
      if (window.isSecureContext === false || !navigator.geolocation?.watchPosition) {
        setError('Pengesanan ketibaan memerlukan HTTPS dan sokongan lokasi pelayar.');
        setEnabled(false);
        return;
      }
      const current = generation;
      setNotice('Menunggu lokasi yang tepat…');
      try {
        watch = navigator.geolocation.watchPosition(position => {
          if (disposed || current !== generation || document.hidden) return;
          fix = { lat: position.coords.latitude, lng: position.coords.longitude,
            accuracy: position.coords.accuracy, timestamp: position.timestamp };
          setError(null);
        }, failure => {
          if (disposed || current !== generation) return;
          fix = null;
          detector.step(null, holySites, Date.now());
          setError(failure.code === 1 ? 'Akses lokasi dinafikan. Benarkan lokasi di tetapan pelayar.' : 'Isyarat lokasi terganggu. Menunggu bacaan baharu…');
          if (failure.code === 1) { stopWatch(); setEnabled(false); }
        }, { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 });
      } catch {
        setError('Tidak dapat memulakan pengesanan lokasi. Cuba lagi.');
        setEnabled(false);
      }
    };
    startWatch();
    const timer = window.setInterval(() => {
      if (document.hidden || disposed) return;
      const now = Date.now();
      const candidates = detector.step(fix, holySites, now);
      const valid = fix && Number.isFinite(fix.accuracy) && fix.accuracy >= 0 && fix.accuracy <= ARRIVAL.accuracy
        && now - fix.timestamp <= ARRIVAL.maxAge && now >= fix.timestamp;
      setNotice(valid ? 'Pengesanan aktif — doa akan dipaparkan apabila anda menghampiri lokasi.' : 'Menunggu GPS tepat (50 m atau lebih baik) dan bacaan terkini…');
      if (candidates) setArrival({ sites: candidates, sequence: ++sequence.current });
    }, 1000);
    document.addEventListener('visibilitychange', startWatch);
    return () => {
      disposed = true;
      stopWatch();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', startWatch);
    };
  }, [enabled]);

  return { enabled, paused, error, notice, arrival,
    start: () => { setError(null); setArrival(null); setEnabled(true); },
    stop: () => { setEnabled(false); setArrival(null); setNotice(''); },
    dismiss: () => setArrival(null),
  };
}
