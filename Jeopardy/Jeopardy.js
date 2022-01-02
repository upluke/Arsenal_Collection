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

    let title=""
    const clues=[]
    for (let cd of cluesData.data){
      title=cd.category.title
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
  console.log(categories)
    
  // generate table  
  for(let i=0;i<=5;i++){
    $headRow.append($('<td />', {text:categories[i]["title"]}))
    if(i<=4){
        $tableArea.append(`<tr>  
        <td data-clue-showing="0-${i}">?</td> 
        
        <td>${categories[1]["clues"][i]["question"]}</td> 
        <td>${categories[2]["clues"][i]["question"]}</td> 
        <td>${categories[3]["clues"][i]["question"]}</td> 
        <td>${categories[4]["clues"][i]["question"]}</td>
        <td>${categories[5]["clues"][i]["question"]}</td> 
    </tr>`)
    }
  }
  $tableArea.prepend($headRow)

}

 
 
// ${categories[0]["clues"][i]["showing"]===null?
// "?":categories[0]["clues"][i]["showing"]==="question"?
//  categories[0]["clues"][i]["question"]:categories[0]["clues"][i]["answer"]} 
 
 

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ig----nore click
 * */

// function handleClick(evt) {
// }
$('#table-area').on('click', 'td', function (evt) {  
    
    console.log($(evt.target).data("clue-showing"));
    const clueIdx=$(evt.target).data("clue-showing") 
    if(categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])]["showing"]===null){
        categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])]["showing"]="question"
        // console.log(">>>",categories)
         console.log(evt.target.innerText )
         evt.target.innerText="test"
    }else if(categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])]["showing"]==="question"){
        categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])]["showing"]="answer"
    }else{
        categories[parseInt(clueIdx[0])]["clues"][parseInt(clueIdx[2])]["showing"]="answer"
    }

  })


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    //get random category Ids
    const categoriesData=await axios.get('https://jservice.io/api/categories',{
        params:{
            count:6
    }})
    const ids=getCategoryIds(categoriesData.data)

    //get data for each category
    for (let id of ids){
      categories.push(await getCategory(id)) 
    }

    //create HTML table
    fillTable()
     

}
 
setupAndStart()

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

