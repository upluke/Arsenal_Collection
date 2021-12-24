// Selecting elements
// It’s as easy as using CSS selectors! (except you need to remember your CSS selectors)

// Most of these jQuery methods, are set up to expect jQuery objects, it's the same CSS selector syntax:
$('img:odd') // select all odd images 

// When you select something with $ sign, you don't get back the same 
// thing you would get abck if you had used getElementById or query selector:
document.querySelectorAll('h1') // returns a NodeList
//NodeList [h1#firstHeading.firstHeading]

$('h1') //returns jQuery Object
//k.fn.init [h1#firstHeading.firstHeading, prevObject: k.fn.init(1)]

// To access an element/or then it into an actual DOM collection, use the get function:
$('h1').get()
//[h1#firstHeading.firstHeading]
$('h1').get(0) // get the first h1
{/* <h1 id=​"firstHeading" class=​"firstHeading" lang=​"en">​Piton de la Fournaise​</h1>​ */}


// Common jQuery Methods
// A great way to learn these is to compare them to vanilla JS methods!
// .val()
// .text()
// .attr()
// .html()
// .css()
// .addClass() / .removeClass() / .toggleClass()
// .empty() / .remove()
// .append() / .prepend()
// .find() / .closest() / .parent() / .next() / .prev()

// jQuery getter / setter pattern
// Vanilla JS: .getAttribute(attrName) and .setAttribute(attrName, newValue)
// jQuery: .attr(attrName, newValue) (second param is optional)
 
//.text() 
// allows us to get the inner text
$('h1').text() //'Piton de la Fournaise'
// set the text by passing in a value
$('h1').text('DUMBO')

//.html()
$('li').html() // only match the FIRST li
//'<a href="#Geology"><span class="tocnumber">1</span> <span class="toctext">Geology</span></a>'
// But you can add in a bold tag for all of lis at once
$('li').html('<b>BOLDDD</b>')

//.attr()
// Let's select every anchor tag and retrieve its href
$('a').attr('href') //'/wiki/French_language'
// update all hrefs
$('a').attr('href', 'http://www.google.com')
// update more than one trribute at the same time with one call to the method
// Let's update all the images with same source
const newAttrs={src:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Reunion_2004_1.jpg/440px-Reunion_2004_1.jpg', alt:'Lava Flow'}
$('img').attr(newAttrs)


//.val()
$('input') //k.fn.init(4) [input, input, input, input, prevObject: k.fn.init(1)]
$('input').val() //"" // first value is empty
$('input').val('') // reset/ clear all inputs on the page all at once
$('input').val('Dombbo') // all of inputs set to Dombbo
//.eq() takes an index that will give us an element. It helps narrow down your selection to a particular element based off of an index starting at zero.
$('input').eq(0) //k.fn.init [input, prevObject: k.fn.init(4)]

// A few classes that ahve to do with classes and CSS adding styles:
// .css()
// We can retrieve a value 
$('a').css('color') //'rgb(0, 0, 238)' // this color is a default style
$('a').css('font-size') //'16px'
$('a').css('font-size', '30px') // set all font size to 30px
const $h1=$('h1')// save it to a variable
$h1.css('background-color', 'teal')
// Set multiple properties at once by passing in an object
const bigTealStyles={color: 'teal', 'font-size': '40px'} // or use camel case fontSize
$('a').css(bigTealStyles)
// apply a defined css class
$('h1').addClass('highlight')  
$('l1').addClass('highlight')
// remove 
$('l1').removeClass('highlight')
// toggle
$('l1').toggleClass('highlight')

// Chaining with jQuery
// Almost all jQuery methods return a jQuery object, which allows for method chaining.
// Instead of performing DOM operations line-by-line, we can chain method calls together on a single jQuery object.
// Instead of:

// let todoContainer = document.querySelector("#todo-container");
// todoContainer.style.color = "red";
// todoContainer.innerText = "look at this!";
// todoContainer.addEventListener(
//     "click", function(evt) { console.log("clicked!") });

//We can have

// $("#todo-container")
//     .css("color", "red")
//     .text("look at this!")
//     .on("click", function(evt) { console.log("clicked!") });

$('h1').css('background-color', 'blue').addClass('highlight').text('CHAINING IS FUN!')



// Traversal

// select the fourth li and save it to a variable
const $fourthLi =$('li').eq(3)
$fourthLi.next() // retrieve the next sibling on the same level 
$fourthLi.prev() // select the previous sibling
// You can also use next() and prev() not just on a single element but on a collection
$('li') // We selected all the lis that gives us 7
//k.fn.init(7) [li.toclevel-1.tocsection-1, li.toclevel-1.tocsection-2, li.toclevel-1.tocsection-3, li.toclevel-1.tocsection-4, li.toclevel-1.tocsection-5, li.toclevel-1.tocsection-6, li.toclevel-1.tocsection-7, prevObject: k.fn.init(1)]
$('li').next() // then we do .next(), then we only have 6 elements bc the last li doesn't have a sibling, so the very first element we get back is that second li  
// k.fn.init(6) [li.toclevel-1.tocsection-2, li.toclevel-1.tocsection-3, li.toclevel-1.tocsection-4, li.toclevel-1.tocsection-5, li.toclevel-1.tocsection-6, li.toclevel-1.tocsection-7, prevObject: k.fn.init(7)]
// Get direct parent
$fourthLi.parent() //k.fn.init [ul, prevObject: k.fn.init(1)]
$('ul').children() //k.fn.init(7) [li.toclevel-1.tocsection-1, li.toclevel-1.tocsection-2, li.toclevel-1.tocsection-3, li.toclevel-1.tocsection-4, li.toclevel-1.tocsection-5, li.toclevel-1.tocsection-6, li.toclevel-1.tocsection-7, prevObject: k.fn.init(1)] 
$('ul').find('a') //k.fn.init(7) [a, a, a, a, a, a, a, prevObject: k.fn.init(1)]
 

// Creating elements
// Instead of using document.createElement("li") we can simply create an element using $("<li>")

// $("<li>") Create a new li
// $("li") Select existing `li`s

// You could even add a class
$('ul').append('<li class="highlight">I AM NEW!!!</li>')
// select all lis and append/prepend checkbox
$('li').append('<input type="checkbox" />')
$('li').prepend('<input type="checkbox" />')

// If we have more complext things or if we want to add certian styles, change atttributes,
// add an event listner, it would be annoying to work with a string exclusively, so we 
// have another option:
$('<h1>') // creats a new h1, it's NOT searching
// or we can add some test in and chain  some CSS :
$('<h1>HELLO</h1>').css('color', 'yellow').appendTo('p')
// After each li we insert a bold tag
$('li').after('<bold>HI</bold>') // .before is the opposite
// remove element
$('h1').remove()

// Events and Delegation with jQuery
// jQuery events
$('img').click(function () {
  alert('HELLO!')
})
// jQuery’s on() works similarly to addEventListener. It lets you specify the type of event to listen for.

$('img').on('mouseenter', function () {
  //this.css('border', '10px solid purple') // doesn't work, bc "this" refers to a regular old JS DOM object, it's not a jQuery object.
  // To turn that into a jQuery object, this is what we do:
  $(this).css('border', '10px solid purple')
})

$('img').on('mouseleave', function(){
  console.log(this.src) // here "this" refers to the particular elelemts that was clicked on  
})

$('img').on('click', function () {
  // $(this).fadeOut(3000, function () {
  //   $(this).remove()
  // })
  $(this).animate({
    opacity: 0,
    width: '50px', //DO NOT ANIMATE WIDTH (POOR PERFORMANCE)
  }, 3000, function () {
    $(this).remove();
  })
})
// Why Use on()?
// In most cases, click() and on(“click”) will both get the job done. HOWEVER, there is one key difference:

// .click(callback) is a shorthand for .on(“click”, callback)
// on() accepts optional argument between type of event and callback
// This flexibility allows us to leverage event delegation.


$('#add-input').on('click', function () {
  $('form').append('<input type="text"/>');
})

// Event Delegation
// Event delegation allows us to attach an event listener to a parent element, but only invoke the callback if the event target matches a certain selector
// This will work even if elements matching the selector don’t exist yet!
// When we click the button, we should append to the form a new input type equals text 
// For example, let's say we want to add a focus event, when we focus on any 
// input on the page, we want to change its value: 
//$('input').on('focus', function () {
//   $(this).val('BAMBOOZLED')
// })
// And it doesn't work on those newly added inputs after hitting add input button.
// Bc those inputs are not there on the page when this code runs. This code is going to add a focus event listener to
// every input that it can find, but when the page loads, there's only four of them, so if we hit add button,
// there's a fifthn, jQuery didn't know about it the event listeners aren't set up it's not added to this element,
// bc the element didn't exist.

// So our workaround is to use event delegation where we add an event listener to a parent,
// and then within that event callback, we check what was the target of this event:
$('form').on('focus', 'input', function () { // filter events and only run the callback by specifying the jQuery a second argument -- selector:
  $(this).val('BAMBOOZLED')
})


// Event Delegation: Vanilla JS vs. jQuery
// Vanilla JS:
// deletes a meme when it is clicked
// even if it doesn't exist on page load

document.getElementById("meme-container")
  .addEventListener("click", function(evt) {
    let target = evt.target;

    // checking for "meme" class on target
    // this logic would need to change a bit
    // if we were searching by something
    // else (eg tag name)

    if (target.classList.contains("meme")) {
      deleteMeme(target);
    }
  });


// jQuery:
// deletes a meme when it is clicked
// even if it doesn't exist on page load

$("#meme-container") //listen for clicks on meme container
  .on("click", ".meme", function(evt) { // if the event.target jas tje class name of "meme", run the callback
    deleteMeme(evt.target);
  });