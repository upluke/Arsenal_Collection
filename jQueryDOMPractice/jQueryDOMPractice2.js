
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
let optionValue=null
// disable dropdown menu when data is unavailable
if(!data.length){
  $('#sortingOptions').attr("disabled", true)
}

$("#listBtn").on("click", function(e){
  e.preventDefault()

  // recover dorpdown menu
   $('#sortingOptions').prop("disabled", false)

  // check the length of the title input beforehand
  if ($("#title").val().length<2){
    alert("Please enter at least two characters for title!") 
    clearInputs()
    return 
  }

  // get the values of the input fields:
  let title=$("#title").val() 
  let rating=$("#rating").val()

  // add data
  data[title]=rating
 
  // dispay data
  displayData(data)

  // clear form afrer submission
  clearInputs()
})

// clear title and rating inputs
const clearInputs=()=>{
  $("#title").val('') 
  $("#rating").val('') 
}

// create elements and display
const displayData=(data)=>{
  $('#item-ul').empty()
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
      // attach an id for list item deletion
      deleteBtn.id = `${k}`
      deleteBtn.addEventListener('click', deleteListItem);
      // append the elements to the ul list
      newLi.append(newH)
      newLi.append(newP)
      newLi.append(deleteBtn)
    
      $('#item-ul').append(newLi)
  }
}

// handle listItem delete 
const deleteListItem = (event)=>{
  let buttonId = event.target.id
  let button = document.getElementById(buttonId);
  let listIemToBeDeleted = button.closest('li')
  listIemToBeDeleted.remove()
  delete data[buttonId]
}

// update optionValue
$("#sortingOptions").change(function() {
  optionValue=this.value
});

// handle sort
$('#sortBtn').on('click', function(e){
  e.preventDefault()
  if (optionValue===null){
    displayData(data)
  }else{
    const sortedData=generateData(optionValue)
    displayData(sortedData)
  }
});

// generate sorted data
const generateData=(optionValue)=>{
    const [optgroupLabel, order]=optionValue.split(' ')
    if (optgroupLabel==='Title'){
      const titlePrep=order==='Ascending'? Object.keys(data).sort() :Object.keys(data).sort().reverse()
      return titlePrep.reduce((acc, cur)=>{
        acc[cur]=data[cur]
        return acc
      },{})
    }else{
      const ratingPrep=order==='Ascending'? Object.values(data).sort():Object.values(data).sort().reverse()
      return ratingPrep.reduce((acc,cur)=>{
        const curKey=Object.keys(data).find(key => data[key] === cur)
        acc[curKey]=cur
        return acc
      },{})
    }
}
