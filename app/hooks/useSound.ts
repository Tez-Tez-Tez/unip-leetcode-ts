import { useCallback, useRef, useState } from "react";

const STORAGE_KEY = "quizMuted";

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine"
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useSound() {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  });

  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playCorrect = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    playTone(ctx, 523.25, 0.15);
    setTimeout(() => playTone(ctx, 659.25, 0.15), 100);
    setTimeout(() => playTone(ctx, 783.99, 0.3), 200);
  }, [muted, getCtx]);

  const playIncorrect = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    playTone(ctx, 311.13, 0.2, "square");
    setTimeout(() => playTone(ctx, 233.08, 0.3, "square"), 150);
  }, [muted, getCtx]);

  const playTimeout = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    playTone(ctx, 220, 0.15, "sawtooth");
    setTimeout(() => playTone(ctx, 180, 0.3, "sawtooth"), 120);
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return { playCorrect, playIncorrect, playTimeout, muted, toggleMute };
}
