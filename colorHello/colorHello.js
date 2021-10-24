// set background and set letters to be centered
const body=document.querySelector("body")
body.style.backgroundColor="black"
body.style.display="flex"
body.style.justifyContent="center"
body.style.alignItems="center"
body.style.height="100vh"

 


// get a random rbg color
function randomRBG(){
    const r=Math.floor(Math.random()*256)
    const g=Math.floor(Math.random()*256)
    const b=Math.floor(Math.random()*256)
    return `rgb(${r}, ${g}, ${b})`
}

// get letters
const letters=document.querySelectorAll('.letter')

let counter=1

const intervalID=setInterval(()=>{
 
    for(let i=0;i<letters.length;i++){ 
        letters[i].style.color=randomRBG()
    }
    counter+=1
    // 5 secs later stop 
    console.log(counter, "counter")
    if(counter>5){
        clearInterval(intervalID)
    }
},500)

 
 
 