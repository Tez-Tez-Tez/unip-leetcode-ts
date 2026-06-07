import { renderHook, act } from "@testing-library/react";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../ThemeContext";

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("debe iniciar con tema oscuro por defecto", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ThemeProvider,
    });
    expect(result.current.isDark).toBe(true);
  });

  it("debe cambiar el tema al hacer toggle", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isDark).toBe(false);
  });

  it("debe persistir el cambio a localStorage", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggle();
    });

    expect(localStorage.getItem("quizTheme")).toBe("false");
  });

  it("debe actualizar la clase dark en el DOM", () => {
    const { result } = renderHook(() => useContext(ThemeContext), {
      wrapper: ThemeProvider,
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
