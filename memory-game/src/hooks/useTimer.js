import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer({
  isRunning = false,
  initialSeconds = 0,
  direction = "up",
  limitSeconds = null,
  intervalMs = 1000,
  onComplete
} = {}) {
  const [seconds, setSeconds] = useState(() => {
    const safeInitial = Number.isFinite(initialSeconds) ? initialSeconds : 0;
    return Math.max(0, Math.floor(safeInitial));
  });

  const savedOnComplete = useRef(onComplete);

  useEffect(() => {
    savedOnComplete.current = onComplete;
  }, [onComplete]);

  const reset = useCallback((nextSeconds = initialSeconds) => {
    const safeNext = Number.isFinite(nextSeconds) ? nextSeconds : 0;
    setSeconds(Math.max(0, Math.floor(safeNext)));
  }, [initialSeconds]);

  const addSeconds = useCallback((amount) => {
    const safeAmount = Number.isFinite(amount) ? Math.floor(amount) : 0;

    setSeconds((current) => Math.max(0, current + safeAmount));
  }, []);

  const subtractSeconds = useCallback((amount) => {
    const safeAmount = Number.isFinite(amount) ? Math.floor(amount) : 0;

    setSeconds((current) => Math.max(0, current - safeAmount));
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const safeInterval = Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 1000;

    const intervalId = globalThis.setInterval(() => {
      setSeconds((current) => {
        if (direction === "down") {
          const next = Math.max(0, current - 1);

          if (next === 0 && current !== 0) {
            savedOnComplete.current?.();
          }

          return next;
        }

        const next = current + 1;

        if (Number.isFinite(limitSeconds) && next >= limitSeconds) {
          savedOnComplete.current?.();
          return Math.floor(limitSeconds);
        }

        return next;
      });
    }, safeInterval);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [isRunning, direction, limitSeconds, intervalMs]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  const progress = Number.isFinite(limitSeconds) && limitSeconds > 0
    ? Math.min(100, Math.max(0, Math.round((seconds / limitSeconds) * 100)))
    : 0;

  const remaining = Number.isFinite(limitSeconds)
    ? Math.max(0, Math.floor(limitSeconds) - seconds)
    : null;

  return {
    seconds,
    minutes,
    remainingSeconds,
    formatted,
    progress,
    remaining,
    reset,
    setSeconds,
    addSeconds,
    subtractSeconds,
    isComplete: direction === "down" ? seconds === 0 : Number.isFinite(limitSeconds) && seconds >= limitSeconds
  };
}