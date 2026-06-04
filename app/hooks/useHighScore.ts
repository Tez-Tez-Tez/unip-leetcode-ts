import { useState, useCallback } from "react";

const STORAGE_KEY = "quizHighScore";

export function useHighScore() {
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  const updateHighScore = useCallback((score: number) => {
    setHighScore((prev) => {
      const newHigh = Math.max(prev, score);
      localStorage.setItem(STORAGE_KEY, String(newHigh));
      return newHigh;
    });
  }, []);

  const resetHighScore = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHighScore(0);
  }, []);

  const isNewRecord = useCallback(
    (score: number) => score > highScore,
    [highScore]
  );

  return { highScore, updateHighScore, resetHighScore, isNewRecord };
}
