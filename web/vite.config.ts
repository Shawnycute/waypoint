import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// data/ lives at the repo root so the Netlify Function can read the same records.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@data": fileURLToPath(new URL("../data", import.meta.url)) },
  },
});
