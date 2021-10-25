

document.addEventListener('mousemove',function(event){
    console.log( event.clientY)
    const r=Math.round(event.pageX*255/window.innerWidth)
    const b=Math.round(event.pageY*255/window.innerWidth)
    const color= `rgb(${r},0, ${b})`
    document.body.style.backgroundColor = color
    
})

