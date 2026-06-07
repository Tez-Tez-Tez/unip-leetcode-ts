import { renderHook, act } from "@testing-library/react";
import { useTimer } from "../useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debe iniciar con el tiempo inicial", () => {
    const { result } = renderHook(() => useTimer(15, vi.fn(), false));
    expect(result.current.timeLeft).toBe(15);
  });

  it("debe contar hacia abajo y llamar onExpire al llegar a 0", () => {
    const onExpire = vi.fn();
    renderHook(() => useTimer(3, onExpire, false));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("no debe contar cuando está deshabilitado", () => {
    const { result } = renderHook(() => useTimer(15, vi.fn(), true));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(15);
  });

  it("debe reiniciar al tiempo inicial", () => {
    const { result } = renderHook(() => useTimer(15, vi.fn(), false));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(10);

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeLeft).toBe(15);
  });
});
