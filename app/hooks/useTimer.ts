import { useState, useEffect, useCallback, useRef } from "react";

export function useTimer(
  initialTime: number,
  onExpire: () => void,
  disabled: boolean
) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (disabled) return;

    if (timeLeft <= 0) {
      onExpireRef.current();
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [disabled, timeLeft]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return { timeLeft, reset };
}
