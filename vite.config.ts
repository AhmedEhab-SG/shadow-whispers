import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Shadow Whispers",
        name: "Shadow Whispers",
        icons: [
          {
            src: "./icon.png",
            type: "image/png",
            sizes: "144x144",
          },
        ],
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        theme_color: "#000000",
        orientation: "portrait",
        description:
          "Shadow Whispers is a game where the player must navigate and kill the monsters and avoid the shadows that lurk within.",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "CacheFirst",
            options: {
              cacheName: "js-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "css-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "font",
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
