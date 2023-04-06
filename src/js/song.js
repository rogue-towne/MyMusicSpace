import Utility from "./utility.mjs";
import ApiService from "./apiService.mjs";
import SongDetails from "./SongDetails.mjs";

const utility = new Utility();
const dataSource = new ApiService();

const songDetailsElement = document.querySelector(".song-details-container");
utility.loadHeaderFooter();
const paramPair = utility.getParamPair();
const songDetails = new SongDetails(
  paramPair["value"],
  songDetailsElement,
  dataSource
);
songDetails.init();
