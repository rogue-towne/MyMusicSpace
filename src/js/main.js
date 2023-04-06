import Utility from "./utility.mjs";
const utility = new Utility();

const exploreBtn = {
  htmlElement: document.querySelector(".explore-btn"),
  url: "/explore/index.html",
};
const musicSpaceBtn = {
  htmlElement: document.querySelector(".music-space-btn"),
  url: "/music-space/index.html",
};

const buttons = [exploreBtn, musicSpaceBtn];

utility.loadHeaderFooter();

utility.setButtons(buttons);
