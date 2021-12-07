// We’ll start with a quick review of objects. In JS, we can make an object using object literal syntax with those curly braces. 
//You may come across this term POJO (Plain Old JavaScript Object).
const color='teal'

const obj={}
obj.color='#3723FF' // {color: "#3723FF"}
obj[color]='#3723FF' // {color: "#3723FF", teal: "#3723FF"} 
obj[1+4-2*8]='#3723FF'// {color: "#3723FF", teal: "#3723FF"; -11:"#3723FF"}  // it's evaluated to negative 11. 
// Can add functions as keys:
obj.sayHi = function() { return "Hi!" };
obj.sayHi();   // Hi!
//Can get arrays of keys, values, or [key, val] arrays:
Object.keys(obj);    // ["color", "teal", "-11", "sayHi" ]

Object.values(o1);  // ["#3723FF", "#3723FF", "#3723FF", function () {...} ]

//entries gives you an array, where each element is a pair, a key-value pair 
Object.entries(o1); // [["color", "#3723FF"], ["teal", "#3723FF"],["-11", "#3723FF"],
                    //  ["sayHi", function () { ... } ]

for (let [k, v] of Object.entries(obj)){
    console.log(k, v)
}


// if you try to access a property that does not exist on an Object,
// you don't get an error, you just get undefined.
Object.bala; // undefined

// All keys get "stringified": any time you add a key to an Object, it's turnned into a string.
obj['-11'] // "#3723FF"
// if we leave off those quotes, we still get the same match
obj[-11] //"#3723FF"

// Mixing Data And Functionality 
// We can add functions as keys:
/* area of right triangle */
function getTriangleArea(a, b) {
    return (a * b) / 2;
  }
  
  /* hypotenuse of right triangle */
  
function getTriangleHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
  }
  getTriangleArea(3, 4)          // 6
  getTriangleHypotenuse(3, 4)    // 5

// This gets a bit messy, though — all those functions to keep track of! (downside: not very reusable)
// Using a POJO
let triangle = {
    a: 3,
    b: 4,
    printThis(){ 
        console.log(this) // keyword"this" will behave differently if we use arrow funciton: printThis : ()=>{...}, bc 'this' will be referring to the window obj, then there's no "this.a", we will get undefined.
    },
    getArea: function() {
      return (this.a * this.b) / 2;
    },
    getHypotenuse() {
      return Math.sqrt(this.a ** 2 + this.b ** 2);
    }
  };
  triangle.getArea()          // 6
  triangle.getHypotenuse()    // 5
 
// Next we'll see how to take the above one-time object, the object literal,
// and turn it into a reusable pattern for an object, using classes.
 
// but before classes, let's look at constructor functions showing what calsses do behind the scenes:
// we're making a Triangle object template. But the code bellow itself is not an object, 
// it's a function. When you call it on its own as a function, 
// you don't get a return value, you just get undefined. But if you call it with new 
// and you pass in values, it makes a new object that follows the exact pattern inside the function. 
function Triangle(a,b){ //typically, we use an uppercase letter, so camel cased 
    this.a=a;
    this.b=b;
    this.getArea=function(){
        return (this.a * this.b) / 2;
    }
    this.getHypotenuse=function(){
        return Math.sqrt(this.a ** 2 + this.b ** 2);
    }
}
Triangle(3, 4)// undefined 

// * both seem kind of simliar, but one is an object, and one is a function
// * but we can make a repeatable pattern out of the functional one:
const t1= new Triangle(3, 4) //Triangle {a: 3, b:4, getArea: f, getHypotenuse: f}
const t2= new Triangle(9, 12) //Triangle {a: 9, b:12, getArea: f, getHypotenuse: f}
t1.getHypotenuse() // 5
t2.getHypotenuse() // 15
// So what does the new keyword do?
// new operator: when you call a function with "new", it creates a blank object
// at the very beginning. Then it passes that new blank object as the "this" context,
// and returns "this" if the function doesn't return its own object. 
// Empty new object:
// {
//     a:a,
//     b:b,
//     getArea(){
//         ...
//     },...
// }
// So anytime we reference "this", we're referring to this new empty object.
// Now we've made a repeatable reusable template, where i can create 100 diffrent triangles,
// each with their own a and b. They each have getArea and getHypotenuse, we don't pass arguments in,
// we can just call the function or the method, and it will look up a and b on the relevant object.
// It's a pattern just like we could make a new Set(), and every time we call new set, we get a new Set()
// object, they follow the same pattern, but they can have diffrent data:
// const s1 = new Set('hello')
// const s2 = new Set('123')
// s1 // Set(4) {"h", "e", "l", "o"}
// s2 //  Set(3) {"1", "2", "3"}
// And they both have the same set of methods, bc they're based off of the same Set template:
// s1.has('h') // true
// s2.has('h') // false
// Likewise, the above we made our own Triangle template. And that used to be the only way 
// of creating these object templates. But we'll see shortly that we now have 
// a clearner easier syntax using classes thanks to ES2015.


// ***** Prototypes - optional content before classes *******
// if we print t1, we get:
// Triangle {a:3, b:4, getArea: f(), getHypotenuse: f(), __proto__: Object}
// here __proto__ is prototype!!!!!

// prototypes are objects that store functionality that can be used across any instance.
const mySet=new Set()
mySet // set(0) {} 
// since Set has __proto__ by default, you can use its "invisible" built-in methods 
mySet.size //0
mySet.add(45) // set(1) {45}



console.log(Array.prototype)

// ***********



// finised Constructor Functions and New