// We're going to tackle one of the quirkiest parts of JS, the keyword "this". 
// This has been confounding many new JS developer for decades, still it can be quite confusing, squirmy,
// seems difficult to pin down, may surprise you at times. Often you'll think the value of "this" will
// be one thing, and then you get an error. It turns out this was undefined or this was something else. 
// So in this section, we're going to talk about this, and lay out the basic rules, so that hopefullly
// you won't ever be surprised agian.

const cat ={
    name: 'Blue',
    breed: 'Scottish Fold',
    dance:function(dance){
        console.log(`Meow, I am ${this.name} and I like to ${dance}`) // here "this" will refer to the cat object
    }
}
cat.dance('foxtrot') // Meow, I am Blue and I like to foxtrot 
// let's capture that dance function on its own
const bluesDance=cat.dance
cat.dance===bluesDance // true       
// They (the above line of code) are pointing to the same item, but they behave differently:
bluesDance('salsa') // Meow, I am   and I like to salsa
cat.dance('salsa') //  Meow, I am Blue and I like to salsa
// So what's the difference? Becase "this" on bluesDance is the window object.

// JavaScript “Functions”
// In a sense, JavaScript doesn’t have functions.
// Everything is called on something, like a method.
function whatIsThis() {
    console.log("this =", this);
  }
let myObj = { func: whatIsThis, color: 'purple' };
  
myObj.func();    // get "this = o"
whatIsThis();      // "this = window"  wtf?!


// Global Object
// When you call a function on nothing … you call it on the “global object”
// In browser JS, that’s "window" (the browser window). That is the global scope in the browser.
// in NodeJS, there's a different global object called "global" (where some Node utilities are)
// You’ve relied on that, even if you didn’t realize it!

console("Hey") // Hey
window.console("Hey")  //Hey   // They are the same end result, we're just being more explicit here.
// So here, console doesn't look like it's being called on any object, 
// but in reality, it's called on the global object, which in the browser is the window.

// A shorthand rule you can keep in mind for the value of this, is that "this" will be set 
// to whatever you have to the left of your dot. 
cat.dance('salsa') // So here we're calling the dance method on Cat. So inside of dance, 
// the value of "this" will correspond to this object. 
myObj.myFunc() //Same thing here when we did myObj.func. Inside of func, which is whatIsThis. So
// when I call it this way, "this" refers to the left side of that period, the myObj object.
whatIsThis(); // When i leave off an object, and I just execute whatIsThis, it's the same as me
// calling window.WhatIsThis. 
const bluesDance=cat.dance // So same thing here, where we grabbed the value of the function
// cat.dance, we saved it to bluesDance
bluesDance('salsa') // and then we executed it like this. We're calling it as window.bluesDance

// It's technically slightly more complicated than that!
// If you remember from "let" and "const", we talked about how let and const are not actually added 
// to the window itself. So bluesDance doesn't actually exist on the window.
// If I look at window.bluesDance. If we try to execute it, we don't get a value
window.bluesDance() // Uncaught TypeError: window.bluesDance is not a function at <anonymous>
// if I instead used var, 
var bluesDance2=cat.dance
// now if I take a look at window.bluesDance2, it's actually defined on the window object
window.bluesDance2() // Window {}...
// So when we use let and const, we still get the same behavior. Even though that bluesDance 
// is variable, is not added to the window object, we get the same end result.
// It's just a samll nuance here, just in case you wanted to try running "window.bluesDance('salsa)",
// you would actually get an error. But the value of "this" is exactaly the same as if bluesDance existed on the window.
// So don't get too caught up in those details. Just think of it this way,
// whatever is to the left of the period, is going to be the value of “this”,
// and if there’s nothing to the left, in the browser at least,
// the value of “this” will be set to the window object. 


// Alright, so the last unanswered question around that cat example. When we call the dance function,
bluesDance('salsa')
// why are we getting jsut a sapce here "Meow, I am     and I like to salsa" 
// It's actually calling window.name, shouldn't I get undefined? Well, this is an extra special case.
// Bc it just so happends that the window has a name on it. It's set to empty string.
window.name // ""
// So if we instead did, [consle.log(`Meow, I am a ${this.breed} and I like to ${dance}`] 
// we will get "Meow, I am a undefined and I like to salsa"
// So using name was extra tricky, bc window has a name on it already. So
// we ended up accessing that property, and getting a value, an empty string.
// Compared to "breed", there is no window.breed, so we get undefined.
// So all that you need to remember for now, 
//the value of "this" changes depending on how a function is executed, it's 
// not set in stone when you write that fucntion. When you write it down,
// you're not cementing the value of "this". Instead, when the function is executed, 
// that's when the value of "this" is finally decided, and it can change depending on how
// you execute that fucntion. The exact same function run two different ways.


// Done 02 this window stuff