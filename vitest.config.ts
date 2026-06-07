import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./app/__tests__/setup.ts",
    include: ["app/**/__tests__/*.test.{ts,tsx}"],
  },
});
