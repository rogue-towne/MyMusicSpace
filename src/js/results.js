import ResultsList from "./ResultsList.mjs";
import Utility from "./utility.mjs";

const utility = new Utility();

const resultsListElement = document.querySelector(".results-container");

// const exploreBtn = {htmlElement: document.querySelector(".explore-btn"), url: "/explore/index.html"}

// const buttons = [exploreBtn];

utility.loadHeaderFooter();
const parameters = utility.getParamPair();
const resultList = new ResultsList(
  parameters["key"],
  parameters["value"],
  resultsListElement
);
resultList.init();
// utility.setButtons(buttons);
