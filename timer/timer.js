
const body=document.querySelector("body")
body.style.backgroundColor="black"
body.style.display="flex"
body.style.justifyContent="center"
body.style.alignItems="center"

const div=document.getElementById("div")
console.log(div.innerText)
console.log(div.textContent)
 
 

const getALLSpans=document.querySelectorAll("span")

function createColor(){
    hex1=Math.floor(Math.random()*256)
    hex2=Math.floor(Math.random()*256)
    hex3=Math.floor(Math.random()*256)
    console.log(hex1, hex2, hex3)
    return `rgb(${hex1}, ${hex2}, ${hex3})`
}

let counter=0
const interIndex=setInterval(()=>{
  
    for(let i=0;i<getALLSpans.length;i++){
        getALLSpans[i].style.fontSize="80px"
        getALLSpans[i].style.margin="5rem 1rem"
        getALLSpans[i].style.color=createColor()
    }
    if(counter>50){
        clear()
    }
},1000)
console.log("interindex", interIndex)



function clear(){
    clearInterval(interIndex)
}