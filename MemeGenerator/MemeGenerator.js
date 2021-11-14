let form= document.querySelector("#add-meme")
let urlInput=document.querySelector('input[id="url"]')
let topTextInput=document.querySelector('input[id="top-text"]')
let btmTextInput=document.querySelector('input[id="bottom-text"]')
let display=document.querySelector("#display")

// handle submit 
form.addEventListener('submit', function(e){
  e.preventDefault()
  newMeme= createMeme(urlInput.value, topTextInput.value, btmTextInput.value)
 
  display.appendChild(newMeme)
  console.log(allMemes.childElementCount)

})
 // create a meme component
function createMeme(url, top_text, btm_text){
  // container that holds image, top text and bottom text
  let container=document.createElement("div")
  container.setAttribute('class', 'container')
  // image
  let img=document.createElement("img")
  img.src=url
  
  // top text
  let top_div=document.createElement("div")
  top_div.setAttribute('class','top_div')
  top_div.innerText=top_text
  // bottom text
  let btm_div=document.createElement("div")
  btm_div.setAttribute('class', 'btm_div')
  btm_div.innerText=btm_text
  

  container.appendChild(img)
  container.appendChild(top_div)
  container.appendChild(btm_div)
 
  
  // reset inputs
  urlInput.value=''
  topTextInput.value=''
  btmTextInput.value='' 
  return container
}
// event delegation: make a parent element the "delegate" 
display.addEventListener('click', function(e){
  if(e.target.tagName==='IMG'){
  e.target.parentElement.remove()
  }
})


// crate a colorful title:

// get a random rbg color
function randomRBG(){
    const r=Math.floor(Math.random()*256)
    const g=Math.floor(Math.random()*256)
    const b=Math.floor(Math.random()*256)
    return `rgb(${r}, ${g}, ${b})`
}
// get letters
const letters=document.querySelectorAll('.letter')
// set colors with interval
const intervalID=setInterval(()=>{
    for(let i=0;i<letters.length;i++){ 
        letters[i].style.color=randomRBG()
    }
},500)

// url for testing:
// https://thumbs.dreamstime.com/z/print-154745710.jpg