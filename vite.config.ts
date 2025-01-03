import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifest as Partial<ManifestOptions>,
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ttf,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:ttf|woff2)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "font-cache",
            },
          },
        ],
      },
    }),
  ],
});
