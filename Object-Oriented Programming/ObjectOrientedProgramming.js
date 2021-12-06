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
 

 
 


// upcoming this and Methods