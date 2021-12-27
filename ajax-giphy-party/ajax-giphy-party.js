async function searchGifs(query){
    const gifsData=axios.get('http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym')
}

function populateGifs(gifs){

}


$('#search-form').on('submit', async function handleSearch(evt){
    evt.preventDefault()
    console.log('click')
    
})