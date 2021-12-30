// my api key: HWad2XWkwB1gSioV9jwV2QYAcXvt9suR

let prevousQuery=''
let prevousShowIdx=1

async function searchGifs(query, limit){
    //reset idx before exceeding maximum amount of response
    if (prevousShowIdx>=49){
      alert("Our gif is running out:( ")
      prevousShowIdx=-1
    }

    const extractedShowData=await filterGifs(query, limit)

    let result=[]
    for (let sd of extractedShowData){
      result.push({url: sd.images.original.url})
    }
    prevousQuery=query
    return result 
}

// fetch data according to query content
async function filterGifs(query, limit){
   if(prevousQuery===query){
      showData= await axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=HWad2XWkwB1gSioV9jwV2QYAcXvt9suR`)
      prevousShowIdx+=1
      return [showData.data.data[prevousShowIdx]]
     
    }else{
      showData= await axios.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit.length===0?'1':limit}&api_key=HWad2XWkwB1gSioV9jwV2QYAcXvt9suR`)
      prevousShowIdx=1
      return showData.data.data
    }
}

// generate gifs
function populateGifs(gifs){
  const $gifsList = $('#gifs-list')
  for (let gif of gifs){
    $gifsList.append(`<div class="col" > <img   src=${gif.url}   alt=${gif.url}  width="200 " height="200"/> </div>`)
  }
}

// get input value
let selectOption=''
$('#select-section').on('change', function(e){
  selectOption= e.target.value
})

// form submission event
$('#search-form').on('submit', async function handleSearch(evt){
    evt.preventDefault()
    const $searchQuery= $('#search-query').val()
    const gifsData=  await searchGifs($searchQuery, selectOption)
    populateGifs(gifsData)
})

// handle removal all event
$('#remove-btn').on('click', function(){
  $('#gifs-list').empty()
})

// handle single removal event
$('#gifs-list').on('click', 'img', function(e){
  $(this).parent().remove()
  prevousShowIdx-=1
  // or
  // e.target.parentElement.remove()
})

//automatically select text
$('#search-query').on('focus', function(){
    $(this).select()
})