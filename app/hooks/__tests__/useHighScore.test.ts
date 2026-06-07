import { renderHook, act } from "@testing-library/react";
import { useHighScore } from "../useHighScore";

const STORAGE_KEY = "quizHighScore";

describe("useHighScore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("debe inicializar en 0 cuando no hay valor guardado", () => {
    const { result } = renderHook(() => useHighScore());
    expect(result.current.highScore).toBe(0);
  });

  it("debe cargar el valor guardado desde localStorage", () => {
    localStorage.setItem(STORAGE_KEY, "5");
    const { result } = renderHook(() => useHighScore());
    expect(result.current.highScore).toBe(5);
  });

  it("debe actualizar el puntaje y persistir en localStorage", () => {
    const { result } = renderHook(() => useHighScore());

    act(() => {
      result.current.updateHighScore(8);
    });

    expect(result.current.highScore).toBe(8);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("8");
  });

  it("no debe bajar el puntaje máximo", () => {
    localStorage.setItem(STORAGE_KEY, "10");
    const { result } = renderHook(() => useHighScore());

    act(() => {
      result.current.updateHighScore(3);
    });

    expect(result.current.highScore).toBe(10);
  });

  it("debe reiniciar el puntaje a 0", () => {
    localStorage.setItem(STORAGE_KEY, "10");
    const { result } = renderHook(() => useHighScore());

    act(() => {
      result.current.resetHighScore();
    });

    expect(result.current.highScore).toBe(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("debe detectar un nuevo récord", () => {
    localStorage.setItem(STORAGE_KEY, "5");
    const { result } = renderHook(() => useHighScore());

    expect(result.current.isNewRecord(7)).toBe(true);
    expect(result.current.isNewRecord(5)).toBe(false);
    expect(result.current.isNewRecord(3)).toBe(false);
  });
});
