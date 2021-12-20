// AJAX stands for asynchronous JS and XML, Which is kinda of a misnomer these days,
// bc most of the time we're working with Jason APIs, not MXL APIs but in the early
// days of Ajax, XML was the reigning data format, so the term Ajax made sense also 
// it just sounds nice, Ajax.

// Let's frist talk about traditional browser requets. Traditional requests happen in 
// response to a couple of things, entering a URL and hitting enter, clicking on a link, 
// submitting a form. And in every single one of those cses, the traditional request, the 
// browser makes a request for us, it gets a response back and then it replaces the entire
// resource with new content, and the entrire page refreshes.

// Before AJAX, without making any requests via JS, all those requests all happen 
// through the browser, and you get a whole page refresh. Now let's compare that with Ajax.
// AJAX is a technique in Javascript for sending requests and receiving responses 
// from a server without having to reload the browser page. AJAX web request made from JavaScript
// in browser. In other words, we are making a request from JS, asynchronously,
// meaning that we're not refreshing the page 
// it's happening while the user still sees our original content that's already on the page, 
// JS gets a response back, then we show the user this new data

// So, to compare the two approaches: 
// A regular request, we have our browser, we click a link, we submit a form,
// we enter something into the nav bar and we hit enter, we're sending a request to the server,
// the server responds back with an entire page of HTML, and our page refreshes, and receive 
// brand new content in the form of a new document. (wikipedia.com)
// Regular Request: 
//          click link/submit form
//          ---------------------> 
// browser                          server
//           <--------------------
//        full HTML page replaces page

// WIth Ajax, we have our browser, typically a user clicks or something happens, 
// it could be on a timer, every 5s we load new data, but something triggers a 
// new request to be sent through JS, JS makes a request to a server, 
// it gets some response, sometimes it could be a ton of information,
// sometimes it might just be a couple pieces of data, these days it's usually Jason,
// not XML, but we get some data back rather than an entire webpage. Then through 
// JS, we can show the use with taht data, we can append it to the page with new elelents, etc. (caniuse.com)
// AJAX Request: 
//          javascript makes request 
//          ---------------------> 
// browser                          server
//           <--------------------
//         bit of data doesn't replace page

// Why Use AJAX?
// Don’t need to reload entire page if just 1 thing is changing
// Interactive web sites
// Fewer full page loads from server
// Your JS can talk to other servers directly
// Less info has to go across network

// There are some downsides though. Wikipedia has a nice summary, one of the big ones is that it's 
// harder to make accessible websites, that screen readers can understand and work with. It's not impossible,
// it used ot be a lot worse than it is today we have some new standards, things like ARIA. If somebody
// has very slow internet or an unreliable connection, if you're doing these Ajax requests in the background,
// sometimes the interaction or the user experience can be not great. So, it a user starts typing something,
// and immediately a request is sent, they haven't hit enter. With Ajax sometiems these requests just 
// happen when you don't know about it. And then one of the biggest issues people bring up has to do 
// with search ranking or SEO. So, most search engine algorithms including Google's, not anymore but in the past, 
// these algorithms would crawl across your web pages and look at the HTML, the content that is on the page when 
// the page loads. But if you're using a lot of Ajax to load information from a server behind the scenes, that 
// conent is not going to be there in the HTML. So, it can be hard to make a good index of your websight for 
// search engines to fully understand what actual content is on the page. But these days Google will wait for 
// JS to run, for information to come back, so it's not a huge issue, but it's somehting to be aware of.

// AJAX with Axios
// You don’t have to use Axios for this
// There is an old, clunky built-in tool: (XMLHttpRequest)
const firstReq=new XMLHttpRequest(); // make a new XMLHttpRequest object.

// requests take time. So JS is going to handle that request off, 
// Whether we do it with XMLHttpRequest, or some of the other options. Behind the scenes,
// JS still relies on the browser to make the request and then the request will be hopefully 
// successful. So when we use XMLHttpRequest, we use callbacks for the same reason that 
// we use callbacks for setTimeout or setInterval. The browser runs some code it takes time,
// when it's finished JS then runs a callback. So this is another example of a synchronous JS.
firstReq.addEventListener('load', function(){ // add an eventListener with the event name of
    // 'load', and give it a callback, this callback will run if our request comes back successful
    const data=JSON.parse(this.responseText) // so if things work out this code runs
    for (let planet of data.results){
        console.log(planet.name)
    }
    // if the another URL we want is located inside of response, then code will look very bulky
    // here the second nested request depends on the first request, bc we need that URL('next' in this case)
    // from the 1st request:
    
    // const nextUrl=data.next;
    // const secondReq=new XMLHttpRequest()
    // secondReq.addEventListener('load', function(){
    //     console.log("SUCCESS!")
    //     const data=JSON.parse(this.responseText) 
    //     for (let planet of data.results){
    //         console.log(planet.name)
    //     }
    // })
    // secondReq.addEventListener('error', ()=>{    
    //     console.log('ERROR!!!!!')
    // })
    // secondReq.open('GET', nextUrl)
    // secondReq.send()
    // console.log("JUST SENT 2ND REQUEST...")
})
firstReq.addEventListener('error', ()=>{ // if there's an error, we add another eventLisener,
    // and then a callback to run in this case. So still at this point no request has actually been sent
    console.log('ERROR!!!!!')
})
firstReq.open('GET', 'https://swapi.py4e.com/api/planets/') // api is not good anymore
firstReq.send()
console.log('SENDING REQUEST....') // this line of code will happen before all the ahove

// Or a newer-but-still-clunky built-in tool: (fetch)
// Or lots of other libraries (including jQuery)
// … but we’ll use axios for now! It’s featureful & popular
const response = axios.get("https://swapi.py4e.com/api/planets/");
console.log(response); // "Promise {<pending>}"
// What’s A Promise???
// We’ll talk about it in more detail when we get to Node.
// For now, all you need to know is that a promise is like a placeholder for a future value.
// We want to wait for the promise to have that value before proceeding.
// But we don’t know when the promise will receive its value!
// And the reason we do that is bc in JS, JS doesn't want to wait, JS doesn't wanna hold
// everything up for 30s if that's how long your interal or your setTimeout is. So instead it
// hands it over to the browser, the web api, which will then keep track of the time and at the
// correct interval, it then taps JS on the shoulder and says, "hey, here's this callback I need you to run."
// Same with with reqeusts, JS itself is not making the reqeust, it's handing the reqeust over. It's
// saying to the browser, "Hey, browser, can you make this reqeust for me? I don't want to hold everything up,
// I've got some other code to run. You just let me know when this request either comes back with some
// value or maybe theire's an eeor, just let me know when you're done with it." So the browser, the web api
// is in charge of actually sending that reqeust. There's no stoppage or nothing is held up 
// in our code, bc the browser is taking care of it. So that's what we've used callbacks for in the past.
// Promises are another approach to this same problem, to writing asynchronous code or we don't have to 
// just nest a bunch of callbacks one inside the other. The problem here is that we want to wait 
// until that promis has a value. At the moment, the request is finished but we have no way of accessing
// that value bc axios.get does not return the value itself bc axios.get does not return the value itself.
// Axios.get just quickly returned immediately returns a promise. And this promise is just a future value.
// There's a way though where we can wait, we can say I want to wait until we have a value back. That's
// the key here in order to using Axios at this point. We need to talk about two keys, async and await.
// These two keywords will allow us to make the request and wait for data to come back rather than having a 
// variable (in this case) that's holding a promise for a future value. We'll actually have the value itself.

// Async wand await
// are a pair of keyswords. We use async to declare a function, as an asynchronous function.
async function getData(){
    const response = await axios.get("https://swapi.py4e.com/api/planets/"); // axios parses it from Jason to a JS object for us automatically.
    const {next, results} =response.data
    for (let planet of results){
        console.log(planet.name)
    } 
    console.log("THIS LINE IS AFTER AXIOS.GET") // without async/await this line runs first, but with them
    // this console.log won't happen unitl after we have a response
    // and response is not that promise but an actual value that we get back from the api.
    const response2=await axios.get(next)
    const results2=response2.data.results
    for (let planet of results){
        console.log(planet.name)
    }  
}
getData()
// if we print something after getData(), it runs and prints out first, before the reqeust is done.
// So using the async and await keywords don't halt execution of all of your JS code in any way.
// It simply makes that funciton behave as if it was synchronous code.
console.log("this will print before getData()")


// Callbacks are what we’ve used for event handlers and timers
// But they’re tricky to nest or do other complex things
// async/await makes it easier to handle chains of requests
// Modern libraries like Axios return “promises”, which you await
// More practice using Axios and async await syntax
async function getLaunches(){
    const res=await axios.get('https://api.spacexdata.com/v3/launches/upcoming')
    renderLaunches(res.data)
}

function renderLaunches(launches){
    const ul=document.querySelector("#launches")
    for (let launch of launches){
        ul.append(makeLaunchLI(launch))
    }
}

function makeLaunchLI(launch){
    const newLI=document.createElement('LI')
    const mission=document.createComment('B')
    mission.innerText=launch.mission_name
    newLI.append(mission)
    newLI.innerHTML+=` - ${launch.rocket.rocket_name}`
    return newLI
}

const btn=document.querySelector('#getLaunches')
btn.addEventListener('click', getLaunches)


// We can wrap our code when we are making a request in a try and any errors results
// from that request or from the response that we get back will be caught in the correesponding 
// catch block and we can handle them and do whatever we need 

async function getRandomDog(){
    const res=await axios.get('https://dog.ceo/api/breeds/image/random')
    const img=document.querySelector("#dog")
    img.src=res.data.message
}


async function getDogByBreed(breed){
    try{
        const url=`https://dog.ceo/api/breed/${breed}/images/random`
        const res=await axios.get(url)
        const img =document.querySelector("#dog")
        img.src=res.data.message
    }catch(e){
        alert("BREED NOT FOUND!")
        getRandomDog()
    }
}

const form = document.querySelector('#searchform')
const input =document.querySelector('#search')
form.addEventListener("submit", function(e){
    e.preventDefault()
    // get a random dog instead if we can't find the breed that we looked for
    getDogByBreed(input.value)
    input.value=''
})


// Axios_get_params: axios.get(url, [config])
// config is an optional object many Axios methods use. 
// It hold specific configuration for what you need.
// To make request for /resource?a=1&b=2, can either use:
// axios.get("/resource?a=1&b=2")
// or
// axios.get("/resource", {params: {a: 1, b: 2}})
// Second form is better: you don’t have to worry about how to “url safe quote” 
//characters that aren’t normally legal in URLs.

async function getJoke(firstName, lastName){
    // let res= await axios.get(`http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`)
    let res= await axios.get(`http://api.icndb.com/jokes/random`,{params:{firstName, lastName}}) 
    console.log(res, "####")
}

getJoke("buter", "steel")

//Axios_.post
//Similar to axios.get, but uses a POST request
// To send data along with a post request, we can send an object 
// as the second argument to axios.post
// axios.post(url, [data,] [config])
// axios.post(url, {a: 1, b: 2})
//This is passed as JSON to the server

async function getUsers(){
    const res=await axios.get('https://reqres.in/api/users') // this api supports all different verbs, http verbs, different end points, including post requests
    console.log(res, "*****")
}
getUsers()

async function createUser(){
    const res=await axios.post('https://reqres.in/api/users',{username: 'Tim', email:"123@gmail.com", age:25})
    console.log(res)
}
createUser()
// data:
// age: 25
// createdAt: "2021-12-20T04:49:27.394Z"
// email: "123@gmail.com"
// id: "596"
// username: "Tim"