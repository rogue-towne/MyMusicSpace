import Utility from "./utility.mjs";
const utility = new Utility();
const favSongsBtn = {
  htmlElement: document.querySelector(".fav-songs-btn"),
  url: "/music-space-results/index.html?key=fav-songs",
};
const favArtistsBtn = {
  htmlElement: document.querySelector(".fav-artists-btn"),
  url: "/music-space-results/index.html?key=fav-artists",
};

const buttons = [favSongsBtn, favArtistsBtn];
utility.loadHeaderFooter();
utility.setButtons(buttons);
