const colorsSection =document.querySelector('#colors')

colorsSection.addEventListener('click', function(e){
    document.body.style.backgroundColor=e.target.dataset.hex
})










// init:
// const buttons=document.querySelectorAll("button")

// for(let btn of buttons){
//     btn.addEventListener('click',function(e){
//         const color= e.target.dataset.hex
//         document.body.style.backgroundColor=color
//     })
// }