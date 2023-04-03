import Utility from "./utils.mjs";
const exploreBtn = document.querySelector(".explore-btn");
const utility = new Utility(exploreBtn);
utility.loadHeaderFooter();

utility.init();
