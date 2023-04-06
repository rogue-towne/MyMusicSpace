import Utility from "./utility.mjs";
const utility = new Utility();

const topSongsBtn = {
  htmlElement: document.querySelector(".top-songs-btn"),
  url: "/explore-results/index.html?chart=songs",
};
const topArtistsBtn = {
  htmlElement: document.querySelector(".top-artists-btn"),
  url: "/explore-results/index.html?chart=artists",
};

const buttons = [topSongsBtn, topArtistsBtn];
utility.loadHeaderFooter();
utility.setButtons(buttons);
