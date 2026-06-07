import { renderHook, act } from "@testing-library/react";
import { useSound } from "../useSound";

const STORAGE_KEY = "quizMuted";

function createMockAudioContext() {
  const osc = {
    type: "",
    frequency: { setValueAtTime: vi.fn() },
    connect: vi.fn(() => osc),
    start: vi.fn(),
    stop: vi.fn(),
  };
  const gain = {
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(() => gain),
  };
  return {
    createOscillator: vi.fn(() => osc),
    createGain: vi.fn(() => gain),
    destination: "mock-destination",
    currentTime: 0,
  };
}

describe("useSound", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debe iniciar con sonido activado por defecto", () => {
    const { result } = renderHook(() => useSound());
    expect(result.current.muted).toBe(false);
  });

  it("debe cargar estado mute desde localStorage", () => {
    localStorage.setItem(STORAGE_KEY, "true");
    const { result } = renderHook(() => useSound());
    expect(result.current.muted).toBe(true);
  });

  it("debe alternar mute y persistir en localStorage", () => {
    const { result } = renderHook(() => useSound());

    expect(result.current.muted).toBe(false);

    act(() => {
      result.current.toggleMute();
    });

    expect(result.current.muted).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBe("true");
  });

  it("no debe crear AudioContext cuando está muteado", () => {
    const mockAudioCtx = createMockAudioContext();
    const AudioContextMock = function () {
      return mockAudioCtx;
    } as unknown as typeof AudioContext;
    vi.stubGlobal("AudioContext", AudioContextMock);

    localStorage.setItem(STORAGE_KEY, "true");
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.playCorrect();
    });

    expect(mockAudioCtx.createOscillator).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("debe reproducir tono correcto cuando no está muteado", () => {
    const mockAudioCtx = createMockAudioContext();
    const AudioContextMock = function () {
      return mockAudioCtx;
    } as unknown as typeof AudioContext;
    vi.stubGlobal("AudioContext", AudioContextMock);

    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.playCorrect();
    });

    expect(mockAudioCtx.createOscillator).toHaveBeenCalledTimes(1);
    expect(mockAudioCtx.createGain).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockAudioCtx.createOscillator).toHaveBeenCalledTimes(3);
    vi.unstubAllGlobals();
  });
});
