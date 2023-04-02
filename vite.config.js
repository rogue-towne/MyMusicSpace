import { dirname, resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        playlist: resolve(__dirname, "src/playlist/create-playlist.html"),
      },
    },
  },
});
