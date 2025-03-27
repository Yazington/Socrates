// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(async () => {
  // Instead of import tailwindcss from "@tailwindcss/vite"
  const tailwindcss = (await import("@tailwindcss/vite")).default;

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        // So that @/... points to <project-root>/src/...
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
