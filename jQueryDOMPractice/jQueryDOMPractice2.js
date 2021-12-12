
// Part Two - Movies App!
// Build an application that uses jQuery to do the following:

// Contains a form with two inputs for a title and rating along with a button to submit the form.
// When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
// When the button to remove is clicked, remove each title and rating from the DOM.

// Further Study
// Ensure that the rating of a movie can only be between 0 and 10.
// Ensure that a title has at least 2 characters in it.
// Allow users to sort alphabetically by the title of the movie or by the rating of the movie from lowest to highest and vice versa.

let data={}

$("#listBtn").on("click", function(e){
  // get the values of the input fields:
  e.preventDefault()
  
  // check the length of the title input beforehand
  if ($("#title").val() .length<2){
    alert("Please enter at least two characters for title!") 
    clearInputs()
    return 
  }
  let title=$("#title").val() 
  let rating=$("#rating").val()

  // add data
  data[title]=rating
  console.log(data)
  const updatedData=sortByTitleOrRating(data)
  console.log(updatedData)
  // dispay data
  displayData(updatedData)

  // clear form afrer submission
  clearInputs()
})

const clearInputs=()=>{
  $("#title").val('') 
  $("#rating").val('') 
}

// handle delete with delegation 
document.querySelector('#list').addEventListener('click', function(e){
  if(e.target.tagName==='BUTTON'){
    const currentKey= e.target.parentElement.textContent.split(' ').pop().slice(0,-7) 
    e.target.parentElement.remove()
    delete data[currentKey] 
  }
})
 

// create elements and display
const displayData=(data)=>{
  $('#list').empty()
  for (let [k, v] of Object.entries(data)){
      // create new htmlElements
      const newLi=document.createElement('li')
      const newH=document.createElement('h2')
      const newP=document.createElement('p')
      const deleteBtn=document.createElement('button')

      // set values of the htmlElements
      newH.innerText=k 
      newP.innerText=v
      deleteBtn.innerText='Delete'
      
      // append the elements to the ul list
      newLi.append(newH)
      newLi.append(newP)
      newLi.append(deleteBtn)
      $('#list').append(newLi)
  }
}

// handle sorting 
const sortByTitleOrRating=(data)=>{
  if($('#movies').val()===null){
      return data
  }else{
    return sorting()
  } 
}

const sorting =(e)=>{ 
        const lookUp={'Title Ascending':1, 'Title Descending':2, 'Rating Ascending':3, 'Rating Descending':4}
        const movieVal= $('#movies').val()
        const category=$('.option').eq(lookUp[movieVal]).parent().attr('label');
 
        return generateDataAccordingToSelection(category, movieVal)
     
}

const generateDataAccordingToSelection=(category, movieValue)=>{
      if (category==='Title'){
        const temp=movieValue==='Title Ascending'? Object.keys(data).sort() :Object.keys(data).sort().reverse()
        return temp.reduce((acc, cur)=>{
              acc[cur]=data[cur]
              return acc
              },{})
      }else{
        const temp=movieValue==='Rating Ascending'? Object.values(data).sort():Object.values(data).sort().reverse()
        return temp.reduce((acc,cur)=>{
                const curKey=Object.keys(data).find(key => data[key] === cur)
                acc[curKey]=cur
                return acc
              },{})
      }
   
}

$('#sortBtn').on('click', function(e){
  e.preventDefault()
  const updatedData=sorting()
  displayData(updatedData)
});