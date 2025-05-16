import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // add that here and don't forget the import!
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      },
    },
  },
});
