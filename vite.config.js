import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        playlist: resolve(__dirname, "src/playlist/create-playlist.html"),
        explore: resolve(__dirname, "src/explore/index.html"),
        exploreResults: resolve(__dirname, "src/explore-results/index.html"),
        musicSpace: resolve(__dirname, "src/music-space/index.html"),
        song: resolve(__dirname, "src/song/index.html"),
        musicSpaceResults: resolve(
          __dirname,
          "src/music-space-results/index.html"
        ),
      },
    },
  },
});
