import { shuffleArray } from "../shuffle";

describe("shuffleArray", () => {
  it("debe retornar un array del mismo largo", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    expect(result).toHaveLength(arr.length);
  });

  it("debe contener todos los elementos originales", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffleArray(arr);
    expect([...result].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
  });

  it("no debe mutar el array original", () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(original);
  });

  it("debe manejar arrays vacíos", () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it("debe manejar arrays de un solo elemento", () => {
    expect(shuffleArray([1])).toEqual([1]);
  });
});
