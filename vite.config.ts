import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifest as Partial<ManifestOptions>,
    }),
  ],
});
