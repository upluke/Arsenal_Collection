// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
let idxForTrackingCategories=0

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds(data) {
   return data.reduce(function(acc, curr){
        acc.push(curr['id'])
        return acc
   }, [])
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    
    const cluesData=await axios.get('https://jservice.io/api/clues',{
        params:{
            category:catId,
        }
    })
    
    let title=cluesData.data[0].category.title
    const clues=[]
    for (let cd of cluesData.data){  
      clues.push({"question": cd.question, "answer":cd.answer, "showing":null})
    }
    
    return {"title": title, "clues":clues}
   
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  const $tableArea= $('#table-area')
  const $headRow= $("<tr></tr>")
  console.log("cat: ", categories)
    
  // generate table  
  for(let i=0;i<=5;i++){
    $headRow.append($('<th />', {text:categories[i]["title"]}))
    if(i<=4){
        $tableArea.append(`<tr>  
        <td data-clue-showing="0-${i}">?</td> 
        <td data-clue-showing="1-${i}">?</td> 
        <td data-clue-showing="2-${i}">?</td> 
        <td data-clue-showing="3-${i}">?</td> 
        <td data-clue-showing="4-${i}">?</td>
        <td data-clue-showing="5-${i}">?</td> 
    </tr>`)
    }
  }
  $tableArea.prepend($headRow)

}

 

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ig----nore click
 * */

// function handleClick(evt) {
// }
$('#table-area').on('click', 'td', function () {  
    const clueIdx=$(this).data("clue-showing")
    const $hintText=$(this).text()
    const targetedClue=categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])] 
    
    if($hintText==="?"){ 
        $(this).text(targetedClue["question"])
    }else if($hintText===targetedClue["question"]){
        $(this).text(targetedClue["answer"])
         // this calss is used to add css effect
        $(this).addClass('highlight-freeze')
    }else{
        $(this).on("click",function(){return false;})
    }

  })


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
 $('#start-btn').on('click', function(){
    console.log(idxForTrackingCategories)
    $('#table-area').empty()
    categories=[]
    setupAndStart()
    console.log(idxForTrackingCategories) 
})

function showLoadingView() {
    $('#loader').removeClass('hidden')
}


 

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#loader').addClass('hidden')
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    // show loading spinner
    showLoadingView() 

    //get random category Ids
    const categoriesData=await axios.get('https://jservice.io/api/categories',{
        params:{
            count:96
    }})
 
    // get ids and chunk them at size of 6
    const ids=getCategoryIds(categoriesData.data)
    const chunked_ids=_.chunk(ids, 6)[idxForTrackingCategories]
    // reset idx if it reaches the maxmum clues, otherwise increment it by 1
    idxForTrackingCategories>=15? idxForTrackingCategories=0: idxForTrackingCategories+=1
    console.log(idxForTrackingCategories)

    //get data for each category
    for (let id of chunked_ids){
      categories.push(await getCategory(id)) 
    }

    //create HTML table
    fillTable()
    
    // remove loading spinner
    hideLoadingView() 
}
 


/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

