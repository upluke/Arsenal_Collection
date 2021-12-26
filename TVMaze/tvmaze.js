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

// tempId is used to track current show id for toggling     
let tempId=''

async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const showData=await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
 
  const res=[]
  for (let sd of showData.data){  
    res.push(checkImageValidity(sd))
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

function checkImageValidity(showData){
  const {id, name, summary} =showData.show
  let medium=''
  medium=showData.show.image===null? 
  "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300" 
  : showData.show.image.medium 
  return {id, name, summary, medium}
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
             <button class="btn btn-success mt-3 mx-auto d-block" data-show-id=${show.id} id="episodes-btn"><a href="#episodes-list" style="all:unset">Episodes</a></button>
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
  // reset tempId to generate new list
  tempId=''
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

  if(episodes.length ===0){
    let $noEpisodeMsg=$(`<p>Oops, it has no episode:(</p>`)
    $episodesList.append($noEpisodeMsg)
  }else{
    for (let episode of episodes){
      let $episodeElement=$(`
        <li id=${episode.id}>${episode.name}(Season: ${episode.season}, Episode: ${episode.number})</li>
      `)
      $episodesList.append($episodeElement)
    }
  }
 
}



 
$('#shows-list').on("click", "#episodes-btn", async function(evt){
  let $episodesArea=  $("#episodes-area")
  const id=evt.currentTarget.dataset.showId


  // toggle episodes area
  if($episodesArea.css("display")==="none" && tempId==='' ){
    $episodesArea.show()
  }  
  if(tempId ===id){
    $episodesArea.hide() 
    tempId=''
  }else{
    tempId=id
  }

  // fetch episodes data
  const episodesData= await getEpisodes(id) 
  // populate episodes list
  populateEpisodes(episodesData)
})