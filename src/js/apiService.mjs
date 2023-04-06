const apiKey = import.meta.env.VITE_GENIUS_API_KEY;
async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw { name: "servicesError", message: data };
    }
  }
// fetch('https://genius-song-lyrics1.p.rapidapi.com/chart/songs/?per_page=10&page=1', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

export default class ApiService {
    constructor(){
        this.options = {
            	method: 'GET',
            	headers: {
            		'X-RapidAPI-Key': apiKey,
            		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            	}
            };
        // this.options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '1ae719fd3fmsha52d1f3685dd82ap120038jsn1c2a4be9ccca',
        //         'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        //     }
        // };
        this.songByIdEndpoint = "song/details/?id="
        this.baseUrl = "https://genius-song-lyrics1.p.rapidapi.com/"
        this.topArtistsEndPoint = "chart/artists/?per_page=10&page=1"
        this.topSongsEndPoint = "chart/songs/?per_page=10&page=1"
        this.searchEndPoint = "search/multi/?q="
        this.artistSongsByIdEndpoint = "artist/songs/?id="
    }
    async getTopSongs(){
        const response = await fetch(this.baseUrl + this.topSongsEndPoint, this.options);
        const jsonData = await convertToJson(response);
        return jsonData;
    }
    async getSongById(songId){
      const response = await fetch(this.baseUrl + this.songByIdEndpoint + songId, this.options);
        const jsonData = await convertToJson(response);
        return jsonData;
    }
    async getSearchResults(searchParam){
      let url = this.baseUrl + this.searchEndPoint + searchParam + "&per_page=3&page=1";
      const response = await fetch(this.baseUrl + this.searchEndPoint + searchParam + "&per_page=3&page=1", this.options);
        const jsonData = await convertToJson(response);
        return jsonData;
    }
    async getArtistSongsById(artistId){
      const response = await fetch(this.baseUrl + this.artistSongsByIdEndpoint + artistId + "&per_page=20&page=1", this.options);
        const jsonData = await convertToJson(response);
        return jsonData;
    }
    async getTopArtists(){
      const response = await fetch(this.baseUrl + this.topArtistsEndPoint, this.options);
      const jsonData = await convertToJson(response);
      return jsonData;
    } 
}