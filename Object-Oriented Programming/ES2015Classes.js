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

// A prototype is just an object and usually contains a bunch of methods, 
// sometimes different properties as well, or different non-method properties.
// And it contains the functionality, the methods that, let's say, every Set would use.
// prototypes are objects that store functionality that can be used across any instance.
// It's a special object. It has a special place in the world of JS. It's predefined for us.
const mySet=new Set()
mySet // set(0) {} 
// since Set has __proto__ by default, you can use its "invisible" built-in methods, they are all on the set prototype
mySet.size //0
mySet.add(45) // set(1) {45}
// You probably noticed when you're looking at the docs,
// the array docs on MDN to llok at all the methods on the left-hand side, 
// you can see that almost all of them start with Array.prototype,
// all of these methods are on this array.prototype.

Set.prototype
// Aarray. prototype is an object hat contains all of the standard array methods.
// And every array we create has access to these methods. Just like every Set that we make.
Array.prototype 
// __proto__ is a property name that references the prototype of this object, even 
// just an empty array []
console.log([].__proto__ === Array.prototype) //true
// The listed above both are referencing the exact same object.
// LHS is just a property on an array and RHS is the actual prototype obejct.
// These prototypes are objects that store functionality that can be used across any instance.

// We can also access the array prototype object, and overwrite it:
Array.prototype.push=function(val){
    console.log(`So you want to add ${val}??`)
    console.log("Sorry don't feel like it!")
}

// As far as changing built-in prototypes is not something you wanna do, there's one 
// situation where it's acceptable, which has to do with polyfills. So, anytime there's a newver
// method in JS that is not implemented across all the broswers, like String.includes() method,
// which is a newer method does not have IE support. If you actually look at the docs, 
// there's a polyfill section there, and that includes some code that you can add to your files, 
// your scripts, that checks if there's an includes method on string.prototype, then don't do anything.
// But if there is not, it defines String.prototype.includes. So includes is a newer method. It's 
// not fully supported in every browser. This is a way of checking if something exists in this environment,
// whichever browser the code runs in, and if it's not there, it's defined. This's reall the only situation
// where you should do that.


// Now back to our Triangle. 
// How do we fix thiis so that we can add getArea and getHypotenuse to the triangle prototype,
// rather than to every individual triangle we make, bc we don't need a separate copy.
// So, let's start with the function excluding methods:
function Triangle(a,b){  
    this.a=a;
    this.b=b;
}
// but, we have to methods on a separate line:
Triangle.prototype.getArea=function(){
    return (this.a * this.b) / 2;
}
Triangle.prototype.getHypotenuse=function(){
    return Math.sqrt(this.a ** 2 + this.b ** 2);
}
const tri1= Triangle(3, 4) // Triangle {a:3, b: 4, __proto__: getArea:f() getHypotenuse: f()}
const tri1= Triangle(9, 12) 
tri1.getArea() // 6
tri2.getArea() // 54
tri1.getArea===tri2.getArea // true

// So, why am I bringing this up? I'm of the opinion that this makes it easier to understand
// why you would use a class. Classes allow us to get the same functionality without having to define
// something like a funciton like ahove, and then separately adding methods to the prototype, bc that
// kinda of annoying to have our data separate form our functionality. Using a class, we can 
// group our methods together with our values in one class, we don't have to talk about the prototype.
// We don't have to reference it at all. And we get the same outcome. I hope it will help you understand
// the benefit of classes.

// *********** Prototypes end


// Classes
// Classes are a new short syntax to create patterns for objecgts or bluepriints for functionality. 
// We define a class which will act as a pattern or a template for a particular type of object we 
// want to create.

class Triangle{ // this thing here is not an object, this is the template
    // in this class we'll define a pattern for our triangles

    // constructors accept values and add them to the instance. The way that we 
    // referenced that instance is using "this" keword. Constructor is 
    // automatically called for us. But never return a value inside the oncstructor.
    // What Can You Do in the Constructor?
    // Common things:
    //    1. Validate data
    //    2. Assign properties
    constructor(a, b, c) {
        //1:Validate data
        for (let side of [a, b, c]){
            if (!Number.isFinite(side) || side <= 0){
                throw new Error("Sides must be postitive numbers!");
            }
        }
        //2:Assign properties:
        this.a = a;
        this.b = b;
        this.c = c;
      }
    

    //methods inside are not actually added to the individual instance, like
    // tri1 or tri2, they are added to the triangle.prototype. Prototype is
    // an object that will contain shared methods.

    // "This" refers to myTri, the specific instance 
   
  
    getArea(){
        const {a, b, c}=this;
        const s =(a+b+c)/2;
        return Math.sqrt(s*(s-a) * (s-b) * (s-c))
    }
    isBig(){
        return this.getArea()>50
    }
    display(){
        console.log(`Triangle with sides of ${this.a}, ${this.b}, and ${this.c}`)
    }

}

// then we need to instantiate new triangles with parentheses
let myTri = new Triangle(3, 4);
myTri.getArea();    // 6


// Extends and Super (supercalss; subclass)
// You use extends keyword. You extend some other class. If you do that, 
// and then you call super from within the constructor of your child or your derived class,
// RightTriangle in our case, that will call the parent constructor, Triangle. And then we can add on 
// some other properties in the subclass. Inside the constructor, we can do some checks beforehand. We'll
// check if it's an invalid right triange first. THere's no need to even get this far, if that's the case.
// Also we can access super at any point with "super." some method. So if you call super as a function, that
// we'll call the constructor. If you call "super." some method that calls a method from the superclass Triangle.
class RightTriangle extends Triangle{
    conststructor(a, b, c){

        if(a*a+b*b!==c*c){
            throw new Error('Invalid C side for right triangle!')
        }
        // super calls the constructor of the supercalss, whatever we're extending. 
        // So in this case, super calls the Triangle constructor  
        // But we have to pass A,B and C in when we call super. Otherwise, the constructor of supercalss
        // is running, but there is no A, B and C. Like we just only made a copy of constructor but have to 
        // pass in our own properties
        super(a, b, c) 
        // after a, b, c passed into supoer, namely passed into the supercalss Triangle, they will be assigned to "this" (eg:this.a=a; this.b=b; this.c=c;). Then 
        // "this" will refer to a specifi instance of RightTriangle (subclass). Even though the code is defined, 
        // it's part of the regular triangle constructor, bc we extended Triangle, in our RightTriangle class definition
        // and we called super. This is going to refer to an instance of RightTriangle. So we reduced a lot of duplication.

        // It's also common when you extend the class to add on new properties
        // MUST call super in the constructor in derived class before accessing "this". 
        this.d=12
    }
    RightTriangleOwnFunction(){ // only on RightTrigle, it's not part of Triangle
       return true
    }
    // we can also overwrite or override existing methods on Triangle
    // If a method is not found on RightTriangle, let's say if it doesn't exist here, like
    // when I called isBig, isBig is not defined here. In that case, the method on the parent class Triangle, the superclass,
    // ran and we got isBig. But what about rn when we have a "conflict"? When I call 
    // myRrightTriangle.display(), it finds the display here first and it stops looking, bc it's closer 
    // to RightTriangle
    display(){
        console.log(`Right Triangle with sides of ${this.a}, ${this.b}, and ${this.c}`)
        // or we can do a slightly modified version:
        // return 'Right ' + super.display();    // **but we need to change console.log to return on superclass
    }

}

const myRightTriangle=new RightTriangle(3,4,5)
console.log(myRightTriangle) // {a:3, b:4, c:5, __proto__: Triangle}
myRightTriangle.getArea() // 6
myRightTriangle.RightTriangleOwnFunction() // true
myRightTriangle.display() // Right Triangle with sides of 3, 4, and 5
const tri=new Triangle(3,5, 9)
tri.display() // Triangle with sides of 3, 4, and 9
 