const form =document.querySelector('#add-friend')
const input=document.querySelector('#first-name')
const friendList=document.querySelector('#friend-list')

friendList.addEventListener('click', function(e){
    // event delegation: make a parent element the "delegate", in this case is <ul> elelnet
    // instead of attaching 10000 event listenners to every single event, 
    // we attach a single event listener on the parent or delegate element
    // and then if the event happens inside a certian child element, 
    // we can access that child element using event.target
    if(e.target.tagName==='BUTTON'){
        e.target.parentElement.remove()
    }
    else if (e.target.tagName==='LI'){
        e.target.classList.toggle('best-friend')
        // create a heart icon
        const heart =document.createElement('span')
        heart.innerHTML='&hearts;'
        e.target.prepend(heart)
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    const newFriend=document.createElement('li')
    const removeBtn=document.createElement('button')
    removeBtn.innerText='UnFriend'

    newFriend.innerText=input.value
    newFriend.appendChild(removeBtn)
    friendList.appendChild(newFriend)
    input.value=''
})