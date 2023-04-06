import Utility from "./utility.mjs";
function songDetailsTemplateFunction(song){
    return `<img id="songImgUrl" src="${song["imgUrl"]}">
    <h1 id="songTitle">${song["songTitle"]}</h1>
    <span id="artistName">${song["artistName"]}</span>
    <label for="releaseDate">Release Date:</label>
    <span id="releaseDate">${song["releaseDate"]}</span>
    <div class="addToFavsBtnContainer">
    <button class="favSongBtn" data-id="${song["songId"]}">Add to Song Favorites</button>
    <button class="favArtistBtn" data-id="${song["artistId"]}">Add to Artist Favorites</button>
</div>`
}

export default class SongDetails{
    constructor(id, parentElement, dataSource){
        this.songId = id;
        this.dataSource = dataSource;
        this.parentElement = parentElement; 
    }
    async init(){
        const details = await this.dataSource.getSongById(this.songId);
        const extractedData =  this.extractSongDetails(details);
        const detailsTemplate = this.populateTemplate(extractedData, songDetailsTemplateFunction);
        this.renderSongDetails(detailsTemplate);
        //addeventlistener to add song/artist to favs
        document.querySelector(".favSongBtn").addEventListener("click", () => this.addSong(extractedData, "fav-songs"));
        document.querySelector(".favArtistBtn").addEventListener("click", () => this.addArtist(extractedData, "fav-artists"));

    }
    renderSongDetails(template){
        this.parentElement.insertAdjacentHTML("afterbegin", template);
    }
    extractSongDetails(songDetails){
        let filteredData = { songId : songDetails["song"]["id"],
        songTitle : songDetails["song"]["title"],
        artistId : songDetails["song"]["primary_artist"]["id"],
        artistName : songDetails["song"]["primary_artist"]["name"],
        imgUrl : songDetails["song"]["song_art_image_thumbnail_url"],
        // playerUrl : songDetails["song"]["apple_music_player_url"],
        releaseDate : songDetails["song"]["release_date"]
    };  
        return filteredData; 
    }
    addSong(data, key){
        const utility = new Utility();
        var localData = localStorage.getItem(key);
        if (localData === null) {
            utility.setLocalStorage(key, []); 
        localData = utility.getLocalStorage(key);
        var songExists = false;
        localData.forEach(song => {
            if (song["songId"] == data["songId"]){
                songExists = true;
            }
        });
        if (!songExists){
            localData.push(data);
            utility.setLocalStorage(key, localData);
        }
        
    }}
    addArtist(data, key){
        const utility = new Utility();
        var localData = localStorage.getItem(key);
        if (localData === null) {
            utility.setLocalStorage(key, []); 
        localData = utility.getLocalStorage(key);
        var artistExists = false;
        localData.forEach(artist => {
            if (artist["artistId"] == data["artistId"]){
                artistExists = true;
            }
        });
        if (!artistExists){
            var artist = {artistId : data["artistId"], artistName : data["artistName"]};
            localData.push(artist);
            utility.setLocalStorage("key", localData);
        }
        
    }}

    populateTemplate(songData, templateFunction){
        let htmlString = "";
        htmlString = templateFunction(songData)
        return htmlString;
    }

}