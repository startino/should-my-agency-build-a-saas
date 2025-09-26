import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "/saas-for-agencies-slides/",
  server: {
    host: true,
    watch: {
      usePolling: true, // Enable polling for bind mounts
      interval: 100, // Very frequent polling (100ms)
      ignored: ["**/node_modules/**"], // Fixed ignore pattern
    },
  },
  resolve: {
    preserveSymlinks: false,
  },
});
