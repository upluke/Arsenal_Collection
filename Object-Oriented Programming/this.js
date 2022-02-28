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

//if we console.log this inside the dance funciton:
const cat ={
    name: 'Blue',
    breed: 'Scottish Fold',
    dance:function(dance){
        console.log('THIS IS: ', this);
        console.log(`Meow, I am ${this.name} and I like to ${dance}`) // here "this" will refer to the cat object
    }
}
// then we try again with cat.dance('salsa'), we see that "this" is set to the object that the dance method exists upon, the entire cat object 
cat.dance('salsa')
// THIS IS:
// > {name: "Blue", breed: "Scottish Fold", dance: f}
// Meow, I am  Blue and I like to salsa


// JavaScript “Functions”
// In a sense, JavaScript doesn’t have functions.
// Everything is called on something, like a method.
function whatIsThis() {
    console.log("this =", this);
  }
let o = { myFunc: whatIsThis };
  
o.func();    // "this = o"
whatIsThis();      // "this = window" 


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


// Call: 
// The method Call is available on every funtion that we create or even existing fucntions that are built in.
// is a way of specifying the value of "this"
// It works with any function whether it's defined in an object explicitly 
// or it's just defined on its own as a funciton declaration.
const cat ={
    name: 'Blue',
    breed: 'Scottish Fold',
    dance:function(dance){
        console.log('This is : ', this)
        console.log(`Meow, I am ${this.name} and I like to ${dance}`) // here "this" will refer to the cat object
    },
    play: function(...toys){
        for (let toy of toys){
            console.log(`${this.name} plays with ${toy}`)
        }
    }
}

const blueDance =cat.dance 
blueDance('salsa') // This is: Window //Meow, I'm undefined and I like to salsa 
// If we want to change the value of "this", we could try 
blueDance.call(cat, 'jitterbug') //two arguments: 1) what value of this should be as "this" 2) any other argumnents that passed the call will be sent along to blueDance
// We could ahve a totoally diffrent object:
const dgo={
    breed: "Black Lab",
    name: 'Elton'
}
blueDance.call(dog, 'hip hop dance') // Neow, I'm a Black Lab and I like to hip hop dance.
// the first "this" is the window:
cat.dance.call(window, 'salsa') //Neow, I'm a undefined and I like to salsa. 
// second time it goes back to normal:
cat.dance('salsa') ////Neow, I'm a Scottish Fold and I like to salsa. 
// We're not permanently altering or mutating or changing the dance funciton in any way. We're just changing how it's executed for one time.

// Call also works with any individule function:
function printThis(){
    console.log('THIS ===>>>', this)
} 
printThis() //"this" will be set to the window
printThis.call(cat) // setting "this" to be the cat object
// we could even set it to be the console object
printThis.call(console) // console...
// could even set it to be a string
printThis.call("dumb bonu") // String{"dumb bonu"} 
//notice it's an object, JS actually makes these temporary wrapper objects for primitives 
//so even though it is a string, JS turns it into an object momentarily  

//Also, we can pass in as many arguments as we want:
cat.play.call(dog, 'bone', 'my cat' ) // Elton plays with bon
                                      // Elton plays with my cat

// Bind:
// The method Bind is available on every funtion that we create or even existing fucntions that are built in.
// You can “perma-bind” a function to a context.
// So bind does the same thing, we pass in a value and that value will be used for 
// the keyword "this", inside whatever function we're binding.
// ** But the main difference is that bind does not execute your funciton like call does.
// Bind returns a new perma-bound funciton. It gives you a version of the funciton that we called
// bind-on where the value of "this" has been changed, been bound permanently within that function.
const blue  ={
    name: 'Blue',
    breed: 'Scottish Fold',
    dance:function(dance){
        console.log('This is : ', this)
        console.log(`Meow, I am ${this.name} and I like to ${dance}`) // here "this" will refer to the cat object
    },
    play: function(...toys){
        for (let toy of toys){
            console.log(`${this.name} plays with ${toy}`)
        }
    }
}
// We pass in an argument, that first argument will be used to set the value of "this"
// in a new function. 
const bDance=blue.dance // So it takes this existing function, creates a copy with permanently bound value of "this".
const boundDance=bDance.bind(blue) // So we can now call boundDance over and over without having to use the call method every time
boundDance('waltz') //Meow, I am Scottish Fold and I like to waltz

// diffrent object
const rocket={
    name: 'Rocket',
    breed: 'Himalayan'
}

const rocketDance=blue.dance.bind(rocket)
rocketDance('tango') //Meow, I am Himalayan and I like to tango

// And we can doubly test the strength, the integrity of the binding if we made another new object
const dog={
    name:'Tyson',
    breed:'Mini Aussie',
    dance:rocketDance
}

dog.dance('waltz') // Meow, I am Himalayan and I like to waltz
// So it doesn't matter, enven though we're calling it as dog.dance, you would think,
// the value of "this" is dog, it's to the left of that period, but we've bound the value 
// of "this" to be rocket.

// Binding Arugments
// We can also bind arguments to functions. That will bake them into the function, so we don't 
// need to pass anything in when calling it.

const boundDance=blue.bDance.bind(blue, 'disco') // baked in disco as the argument dance,
// so everything we call it, we don't pass anything in, we still get disco
blueDisco() // Meow, I am Himalayan and I like to disco

// Another example, here the value of 'this' is bound to blue, and those two argumetns are automatically passed in
const playsWithSocks=blue.play.bind(blue, 'left sock', 'right sock')
playsWithSocks() // Blue plays with left sock    // Blue plays with right sock
// What happens if I pass in a third arugment to playsWithSocks?
playsWithSocks('dirty sock') // Blue plays with left sock    // Blue plays with right sock // Blue plays with dirty sock
// it's just added in at the end.
// THEREFORE, this funciton playsWIthSocks based off the existing blue.play,
// has the value of "this" that's always se to blue, and it has two arguments that are 
// always the first two arguments that are passed in. But our funciton accepts an unlimited number
// or a variable number of arguments, so we can continue to pass more in.


function applySalesTax(taxRate, price) {
    return price + price * taxRate;
  }

applySalesTax(0.0725, 19.99) // 21.439275
// "null" for "this" means it doesn't matter what "this" is, and the value of 'this' will not be bound
// that's to say if you don't want to bind the value of "this", pass in null, and then afterwards you can 
// optionally pass in argument(s).
const applyCATax = applySalesTax.bind(null, 0.0725);
applyCATax(19.99);  // 21.439275
const applyTXTax = applySalesTax.bind(null, 0.0625);
applyTXTax(19.99); // 21.239375
// SO two functions, we get diffrent output each time, even with the same input, bc we've pre-baked in that first argument.

// Here's the last example where we'll use bind to both set the value of "this" as well as baking in an argument.
const bobsMembership={
    name: 'Bob',
    total:250
}

function collectMonthlyFee(fee){
    const remaining=this.total-fee 
    this.total=remaining
    return this.name +' remaining balance:' + remaining
}

const collectBobsFee=collectMonthlyFee.bind(bobsMembership, 5)
collectBobsFee()// "Bob remaining balance: 245"
collectBobsFee()// "Bob remaining balance: 240"
collectBobsFee()// "Bob remaining balance: 235"
bobsMembership // {name: "Bob", total: 235}

// we can also reuse this method for a diffrent membership or differnt person
const jillsMembership={
    name: 'Jill',
    total: 899
}
const collectJillsFee=collectMonthlyFee.bind(jillsMembership, 35)
collectJillsFee() // "Jill remaining balance: 864"
collectJillsFee() // "Jill remaining balance: 829"
collectJillsFee() // "Jill remaining balance: 794"
jillsMembership //{name: "Jill", total: 794}
// So two functions now based off of the same template function, but with a diffrent value of "this",
// pre bound, and an argument baked in.


// Callback on Methods

const blue2  ={
    name: 'Blue',
    breed: 'Scottish Fold',
    dance:function(dance){
        console.log('This is : ', this)
        console.log(`Meow, I am ${this.name} and I like to ${dance}`) // here "this" will refer to the cat object
    },
    play: function(...toys){
        for (let toy of toys){
            console.log(`${this.name} plays with ${toy}`)
        }
    },
    greet(){
        alert(`${this.name} SAYS MEOW`)
    }
}
// One common scenario is when you're passing an object method as a callback:
document.querySelector('#btn-1').addEventListener('click', blue.greet) // SYAS MEOW
// so we can use bind to fix it
document.querySelector('#btn-1').addEventListener('click', blue.greet.bind(blue)) // Blue SAYS MEOW


// Pre-binding Calls
const btnA=document.querySelector('#a')
const btnB=document.querySelector('#b')
const btnC=document.querySelector('#c')

function popUp(msg) {
    alert("Secret message is " + msg);
  }

// ver 1:
// btnA.addEventListener('click', function(){
//     popUp('BUTTON A SYAS HI!')
// })
// btnB.addEventListener('click', function(){
//     popUp('BUTTON B SYAS HI!')
// })
// btnC.addEventListener('click', function(){
//     popUp('BUTTON C SYAS HI!')
// })

// ver 2:
// function handleClick(evt) {
//     let id = evt.target.id;
  
//     if (id === "a") popUp("Apple");
//     else if (id === "b") popUp("Berry");
//     else if (id === "c") popUp("Cherry");
//   }


// Rather than having to add sepparate callback functions, to pass in diffrent arguments (ver1),
// or (ver2) where we're checking within our handle click to see which button was clicked based off of
// the ID, we can use bind to bake in an argument :

// ver 3:
btnA.addEventListener("click", popUp.bind(null, "BUTTON A SYAS HI"));
btnB.addEventListener("click", popUp.bind(null, "BUTTON B SYAS HI"));
btnC.addEventListener("click", popUp.bind(null, "BUTTON C SYAS HI"));


// Arrow Functions and This
// Arrow functions are really nice convenient shortcut for defining a funciton, but they 
// behave differently around the keyword "this".

const greeter={
    msg: 'I like pandaz',
    sayHi:()=>{
        alert(this.msg) // window object
    },
    sayHi2:function(){
        alert(this.msg) // greeter obejct
    }
}

greeter.sayHi() // undefined
greeter.sayHi2()// I like pandaz 
//What happending here is that arrow functions do not make their own "this".
// When you create an arrow function you don't change the value of "this" like 
// a regular funciton would. So this non-arrow function [sayHi: funciton(){...}], the value 
// of "this" is set to the object. But the value of "this " as an arrow funciton is the window object.
// SO that's the mian reason it's not recommended that you use arrow functions as methods on objects.


// Another case senario when you don't want a new value of "this", like when you're passing a callback
// to set timeout or to other functions which may end up changing the value of "this ", so we can use 
// arrow function rather than binding explicitly:

const greeter2={
    msg: 'I like pandaz',
    sayHi:()=>{
        alert(this.msg) // window object
    },
    waitAndGreet: function(delay){
        setTimeout( function(){
            alert('HIIII!!!')
        }, delay);
    },
    waitAndGreet2: function(delay){
        setTimeout( function(){
             alert(this.msg)
        }, delay);
    }
}

greeter.waitAndGreet(2000) // 2s later we get 'HIIII!!!'  // no problem!
// So now What if I want to display "this.msg":
greeter.waitAndGreet2(2000) // undefined
// Why is it undefined here? What is the value of "this" inside our setTimeout callback?

// waitAndGreet2: function(delay){
//     console.log(this);             // greeter object
//     setTimeout( function(){
//          console.log(this);        // window object
//          alert(this.msg)
//     }, delay);
// }

// So here's one way we could solve it, we could use bind. We can bind the value of "this" on 
//  (setTimeout's) callback function:

const greeter3={
    msg: 'I like pandaz',
    sayHi:()=>{
        alert(this.msg) // window object
    },
    waitAndGreet: function(delay){
        let callback=function(){
            alert(this.msg)     // greeter object
        }
        setTimeout( callback.bind(this), delay);
    }
}


// We could also do it in line:
const greeter4={
    msg: 'I like pandaz',
    sayHi:()=>{
        alert(this.msg) // window object
    },
    waitAndGreet: function(delay){    
        setTimeout( 
            function(){  // an anonymous funciton expression 
                alert(this.msg) // greeter object
            }.bind(this),
            delay);
    }
}

// Thanks to arrow functions, we have an even easier way,
// we don't have to wrry about binding 
const greeter5={
    msg: 'I like pandaz',
    sayHi:()=>{
        alert(this.msg) // window object
    },
    waitAndGreet: function(delay){
        setTimeout(()=>{ 
                alert(this.msg) // greeter object
            }, delay);
    }
}
 
