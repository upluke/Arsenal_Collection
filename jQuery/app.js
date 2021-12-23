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




// $('img').click(function () {
//   alert('HELLO!')
// })

$('img').on('mouseenter', function () {
  $(this).css('border', '10px solid purple')
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

$('#add-input').on('click', function () {
  $('form').append('<input type="text"/>');
})

$('form').on('focus', 'input', function () {
  $(this).val('BAMBOOZLED')
})