/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const showData=await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
  
  const res=[]
  for (let sd of showData.data){
    const {id,name,summary,image:{medium}}=sd.show
    res.push({id, name, summary, medium})
  }
  return res
  // return [
  //   {
  //     id: 123,
  //     name: 'name',
  //     summary: 'summary',
  //     image: 'image'
  //   }
  // ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" id="data-show-id" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top"  src="${show.medium}"  alt="${show.name}" >
            
             <button class="btn btn-success mt-3 mx-auto d-block" data-show-id=${show.id} id="episodes-btn">Episodes</button>
           </div>
         </div>
       </div>
      `);
    
    $showsList.append($item);
   
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
 
  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);

});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodes=await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  const res=[]
  for (let episode of episodes.data){
    const {id, name, season, number}=episode
    res.push({id, name, season, number})
  }
  return res
  // TODO: return array-of-episode-info, as described in docstring above
}

function populateEpisodes(episodes){
  const $episodesList=$("#episodes-list")
  $episodesList.empty()

  for (let episode of episodes){
    let $epi=$(`
      <li id=${episode.id}>${episode.name}(${episode.season}, ${episode.number})</li>
    `)
    $episodesList.append($epi)
  }
}

 
$('#shows-list').on("click", "#episodes-btn", async function(evt){
  let $episodesArea=  $("#episodes-area")
  // toggle episodes area
  if($episodesArea.css("display")==="none"){
    $episodesArea.show()
  }else{
    $episodesArea.hide() 
  }
  // fetch episodes data
  const id=evt.currentTarget.dataset.showId
  const episodesData= await getEpisodes(id) 
  // populate episodes list
  populateEpisodes(episodesData)
})