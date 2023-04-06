import ApiService from "./apiService.mjs";
import Utility from "./utility.mjs";

function songTemplateFunction(song, count){
    return `<a href="../song/index.html?songId=${song["songId"]}">
    <li class="result-card">
    <span id="result-number">${count}</span>
    <div class="result-contents">
        <span id="song-title">${song["songTitle"]}</span>
        <span id="artist-name">${song["artistName"]}</span>
        </div>
    </li>
    </a>`
};
function artistTemplateFunction(artist, count){
    return `<a href="../explore-results/index.html?artistId=${artist["artistId"]}">
    <li class="result-card">
      <span id="result-number">${count}</span>
      <div class="result-contents">
        <span id="artist-name">${artist["artistName"]}</span>
      </div>
    </li>
  </a>`
};


export default class ResultsList{
    constructor(paramKey, paramValue, listElement){
        this.paramKey = paramKey;
        this.paramValue = paramValue;
        this.dataSource;
        this.listElement = listElement;
      
    }
    async init(){
        let data;
        const utility = new Utility();
        switch(this.paramValue){
            case "songs":
                this.dataSource = new ApiService();
                data = await this.dataSource.getTopSongs();
                const songTemplate = this.populateTemplate(this.extractTopSongData(data), songTemplateFunction)
                this.renderResultsList(songTemplate);
                break;
            case "artists":
                this.dataSource = new ApiService();
                data = await this.dataSource.getTopArtists();
                const artistsTemplate = this.populateTemplate(this.extractTopArtistsData(data), artistTemplateFunction)
                this.renderResultsList(artistsTemplate);
                break;
            case "fav-songs":
                data = localStorage.getItem("fav-songs");
                if (data === null) {
                    utility.setLocalStorage("fav-songs", []); 
                } else {
                    this.dataSource = utility.getLocalStorage("fav-songs")
                    const favSongsTemplate = this.populateTemplate(this.dataSource, songTemplateFunction);
                    this.renderResultsList(favSongsTemplate);
                }
                break;
            case "fav-artists":
                data = localStorage.getItem("fav-artists");
                if (data === null) {
                    utility.setLocalStorage("fav-artists", []); 
                } else {
                    this.dataSource = utility.getLocalStorage("fav-artists")
                    const favArtistsTemplate = this.populateTemplate(this.dataSource, artistTemplateFunction);
                    this.renderResultsList(favArtistsTemplate);
                }
                break;   
        }
        switch(this.paramKey) {
            case "artistId":
                this.dataSource = new ApiService();
                data = await this.dataSource.getArtistSongsById(this.paramValue);
                const songTemplate = this.populateTemplate(this.extractArtistSongsData(data), songTemplateFunction)
                this.renderResultsList(songTemplate);
                break;
            case "search":
                this.dataSource = new ApiService();
                data = await this.dataSource.getSearchResults(this.paramValue);
                // const searchTemplate = this.populateSearchResultsTemplate(this.extractSearchResultData(data), songTemplateFunction, artistTemplateFunction)
                // this.renderResultsList(searchTemplate);
                break; 
        }
    };
    
    renderResultsList(template){
        this.listElement.insertAdjacentHTML("afterbegin", template);
    };
    extractArtistSongsData(data){
        var length = data["songs"].length;
        const filteredData = [];
        for (let i = 0; i < length; i++){ 
            filteredData.push({songId: data["songs"][i]["id"], songTitle: data["songs"][i]["title"], artistName: data["songs"][i]["primary_artist"]["name"]})
        };
        return filteredData; 
    };
    extractTopSongData(songs){
        var length = songs["chart_items"].length;
        const filteredData = [];
        for (let i = 0; i < length; i++){ 
            filteredData.push({songId: songs["chart_items"][i]["item"]["id"], songTitle: songs["chart_items"][i]["item"]["title"], artistName: songs["chart_items"][i]["item"]["primary_artist"]["name"]})
        };
        return filteredData; 
    };

    extractTopArtistsData(artists){
        var length = artists["chart_items"].length;
        const filteredData = [];
        for (let i = 0; i < length; i++){ 
            filteredData.push({artistId: artists["chart_items"][i]["item"]["id"], artistName: artists["chart_items"][i]["item"]["name"]})
        };
        return filteredData; 
    };

    extractSearchResultData(data){
        const filteredData = [];
        data["sections"].forEach(result => {
            if (result["type"] == "top_hit"){
                result["type"]["hits"].forEach(innerResult => {
                    if (innerResult["type"] == "artist"){
                        filteredData.push({type: "artist", artistId: innerResult["result"]["id"], artistName: innerResult["result"]["name"]})
                    } else if(innerResult["type"] == "song" ){
                        filteredData.push({type: "song", songId: innerResult["result"]["id"], songTitle: innerResult["result"]["title"], artistName: innerResult["result"]["primary_artist"]["name"]})
                    }
                })
            }; 
            if (result["type"] == "song"){
                result["type"]["hits"].forEach(innerResult => {
                    filteredData.push({type: "song", songId: innerResult["result"]["id"], songTitle: innerResult["result"]["title"], artistName: innerResult["result"]["primary_artist"]["name"]})

                })};
            if (result["type"] == "artist"){
                result["type"]["hits"].forEach(innerResult => {
                    filteredData.push({type: "artist", artistId: innerResult["result"]["id"], artistName: innerResult["result"]["name"]})
                })};
                            
        })
        return filteredData; 
    };

    populateSearchResultsTemplate(data, songTemplateFn, artistTemplateFn){
        let count = 1;
        let htmlString = "";
        data.forEach(element => {
            if (element["type"] == "song"){
                htmlString += songTemplateFn(element, count)
                count++;
            }
            else if (element["type"] == "artist"){
                htmlString += artistTemplateFn(element, count)
                count++;
            } 
          });
          return htmlString;
    };

    populateTemplate(data, templateFunction){
        let count = 1;
        let htmlString = "";
        data.forEach(element => {
          htmlString += templateFunction(element, count)
            count++;
        });
        return htmlString;

    };
}