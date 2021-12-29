// my api key: HWad2XWkwB1gSioV9jwV2QYAcXvt9suR
async function searchGifs(query, limit){
 
    const showData= await axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit.length===0?'1':limit}&api_key=HWad2XWkwB1gSioV9jwV2QYAcXvt9suR`)
    
    let result=[]
    for (let sd of showData.data.data){
      console.log(sd, "^^^^^^^^^^")
      result.push({id: sd.id, url: sd.images.original.url})
    }
    return result 
}


function populateGifs(gifs){
  console.log("inside", gifs)
  const $gifsList = $('#gifs-list')
  for (let gif of gifs){
    $gifsList.append(`<img id=${gif.id} src=${gif.url}   alt=" " width="500" height="600"/>`)
  }

  // const $gif=$(`<img id=${gifs.id} res=${gifs} ult=  />`)
}

let selectOption=''
$('#select-section').on('change', function(e){
  selectOption= e.target.value
})


$('#search-form').on('submit', async function handleSearch(evt){
    evt.preventDefault()
    const $searchQuery= $('#search-query').val()
 
    const gifsData=  await searchGifs($searchQuery, selectOption)
    populateGifs(gifsData)
})