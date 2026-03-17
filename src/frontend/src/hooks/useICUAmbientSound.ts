import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useICUAmbientSound
 * Creates subtle ICU ambient audio using Web Audio API:
 *  - Cardiac monitor beep every ~1s (880 Hz, 50ms)
 *  - Ventilator rhythm every ~3s (150 Hz, 120ms)
 *  - Optional cough bursts for respiratory conditions
 *  - Optional moan for pain conditions
 */
export function useICUAmbientSound(options?: {
  hasCough?: boolean;
  hasMoan?: boolean;
  autoStart?: boolean;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(false);
  const gainRef = useRef<GainNode | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const activeRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      const g = ctxRef.current.createGain();
      g.gain.value = 0.15;
      g.connect(ctxRef.current.destination);
      gainRef.current = g;
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (
      freq: number,
      duration: number,
      type: OscillatorType = "sine",
      volume = 1,
    ) => {
      if (muted) return;
      try {
        const ctx = getCtx();
        if (ctx.state === "suspended") ctx.resume();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 0.01);
        g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.05);
      } catch {
        // silent fail if audio not available
      }
    },
    [muted, getCtx],
  );

  const playCough = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();
      const bufSize = ctx.sampleRate * 0.3;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] =
          (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.4)) * 0.3;
      }
      const source = ctx.createBufferSource();
      const g = ctx.createGain();
      source.buffer = buf;
      g.gain.value = 0.12;
      source.connect(g);
      g.connect(ctx.destination);
      source.start();
    } catch {
      // silent
    }
  }, [muted, getCtx]);

  const playMoan = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.4);
      osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.8);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.15);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1);
    } catch {
      // silent
    }
  }, [muted, getCtx]);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t);
    timersRef.current = [];
  }, []);

  const scheduleLoop = useCallback(
    (fn: () => void, baseInterval: number, jitter: number) => {
      const next = () => {
        if (!activeRef.current) return;
        fn();
        const delay = baseInterval + Math.random() * jitter - jitter / 2;
        const t = setTimeout(next, delay);
        timersRef.current.push(t);
      };
      const t = setTimeout(next, baseInterval);
      timersRef.current.push(t);
    },
    [],
  );

  const start = useCallback(() => {
    activeRef.current = true;
    clearTimers();
    // Cardiac monitor beep ~1s
    scheduleLoop(() => playTone(880, 0.05, "sine", 1), 1000, 200);
    // Ventilator rhythm ~3s
    scheduleLoop(
      () => {
        playTone(150, 0.12, "triangle", 0.6);
        setTimeout(() => playTone(120, 0.08, "triangle", 0.4), 400);
      },
      3000,
      500,
    );
    // Cough every 10-15s for respiratory
    if (options?.hasCough) {
      scheduleLoop(playCough, 12000, 6000);
    }
    // Moan every 15-20s for pain
    if (options?.hasMoan) {
      scheduleLoop(playMoan, 18000, 8000);
    }
  }, [clearTimers, scheduleLoop, playTone, playCough, playMoan, options]);

  const stop = useCallback(() => {
    activeRef.current = false;
    clearTimers();
  }, [clearTimers]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (gainRef.current) {
        gainRef.current.gain.value = next ? 0 : 0.15;
      }
      return next;
    });
  }, []);

  // Auto-start
  useEffect(() => {
    if (options?.autoStart) {
      start();
    }
    return stop;
  }, [options?.autoStart, start, stop]);

  // Sync muted with gain
  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = muted ? 0 : 0.15;
    }
  }, [muted]);

  return { muted, toggleMute, start, stop, playTone, playCough, playMoan };
}
