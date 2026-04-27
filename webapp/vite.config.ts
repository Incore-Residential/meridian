import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const BACKEND_PROXY_TARGET = process.env.VITE_BACKEND_PROXY_TARGET || "http://localhost:3000";

export default defineConfig({
  server: {
    host: "::",
    port: 8000,
    proxy: {
      "/api": { target: BACKEND_PROXY_TARGET, changeOrigin: true },
      "/health": { target: BACKEND_PROXY_TARGET, changeOrigin: true },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
