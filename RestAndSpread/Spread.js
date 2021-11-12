// 1. Value vs Reference
// *** Primitives data types pass values
let y=2;
let y=x; // pass the value of 2 to y
y+=1;  // by adding 1 to y we didn't change the value of x 
console.log(y); //3
console.log(x); //2

// in contrast to that,
// *** Structural data types pass references to a spot in memory
// the array actually uses references in memory like a pointer
// to where those values are, instead of passing the values themsevels 

let xArray=[1,2,3]
let yArray=xArray
yArray.push(4)
console.log(yArray)  //[1,2,3,4]
console.log(xArray)  //[1,2,3,4]

// 2. Mutable vs Immutable
// Primitives data types are immutable
let myName="Judy"
myName[0]="W"; // nope!
console.log(myName) // Judy
// Reassignment is not the same as mutatble
myName="Wudy" // Wudy

// Structural data types contain mutable data
yArray[0]=9
console.log(yArray) //[9,2,3,4]
console.log(xArray) //[9,2,3,4]


// 3. Pure Fucntions vs Impure functions

//**Pure functions require you to avoid mutating the data
// ALl of this is important to know when constructing pure functions
// because they require you to avoid mutating the original data
const pureAddToScoreHistory=(array, score, cloneFunc)=>{
    const newArray=cloneFunc(array) // cloneFunc is defined bellow
    newArray.push(score)
    return newArray
}
const pureScoreHistory=pureAddToScoreHistory(scoreArray, 18, deepClone)
console.log(pureScoreHistory) //[44, 23, 12, 14, 18]
console.log(scoreArray) //[44, 23, 12, 14])

//**Impure function that mutates the data
// this muates the original array
// this is considered to be a side-effect
const addToScoreHistory=(array, score)=>{
    array.push(score);
    return array;
}
const scoreArray=[44, 23, 12] // Notice: "const" doesn't make the array immutable
console.log(addToScoreHistory(scoreArray, 14)) //[44, 23, 12, 14]

// 4. Shallow copy vs. Deep copy

// shallow copy:
// ** Whether we use spread operator or object.assign to make a new array
// or even a new object, they don't share a reference until that original 
// has a nested structural data type, and then we have the same problem,
// a shallow copy does not go levels deep when it comes to structural data types

// with the spread operator, do not sure same references (as long as it's not nested sturctures)
const zArray=[...yArray, 10]
console.log(zArray) // [9,2,3,4,10]
console.log(yArray) // [9,2,3,4]
console.log(xArray===yArray) //true
console.log(yArray===zArray) // false

// With Object.assign(), , do not sure same references (as long as it's not nested sturctures)
const tArray=Object.assign([], zArray) // clone zArray
console.log(tArray) // [9,2,3,4,10]
console.log(tArray===zArray) //false  bc they do not use the same references in memory
tArray.push(11)
console.log(zArray) // [9,2,3,4,10]
console.log(tArray) // [9,2,3,4,10,11]

// Note: Array.from() and slice() create shallow copies, too.


// But if there are nested arrays or objects...
// **Shallow copies still share references of nested structures
// which allows for mutation of the original data
yArray.push([8,9,10])
const vArray=[...yArray]
console.log(vArray) //[9,2,3,4,Array(3)]
vArray[4].push(5)
console.log(vArray) //[9,2,3,4,Array(4)]
console.log(yArray) //[9,2,3,4,Array(3)]




// Object.freeze() creates a shallow freeze, and can we freeze that and prevent it from 
// mutating? ANswer is No! Because Object.freeze() is essentially a shallow freeze
const scoreObj={
    "first":44,
    "second":12,
    "third":{"a":1, "b":2}
}
Object.freeze(scoreObj)// call freeze on the scoreObj
scoreObj.third.a=8
console.log(scoreObj) // {frist:44, second:12, thrid:{a:8, b:2}}

// Deep copies share no references
// Several libraries like loadsh, Ramda, and others have 
// this feature built-in

// **Here is a one line vanilla JS solution, but it doesn't work with 
// Dates, functions, undefined, Infinity, RegExps, Maps, Sets, Blobs,
// FileLists, ImageDatas, and other complex data types.

// so we're essentially turning
// it into a json string and then parsing it back into an object. But the json.stringify
// method loses the data types that we list above
const newScoreObj=JSON.parse(JSON.stringify(scoreObj)) 
console.log(newScoreObj)
console.log(newScoreObj===scoreObj) //false

// **another way: instead of using a library, here is a Vanilla JS function
const deepClone=(obj)=>{
    // Note: type of null is an object and that's a quirk in JS
    if(typeof obj !=="object" || obj===null) return obj;

    // create an array or obejct to hold the values
    const newObject =Array.isArray(obj)?[]:{}

    for (let key in obj){
        const value=obj[key]
        // recursive call for nested objects & arrays
        newObject[key]=deepClone(value)
    }
    return newObject;
}
const newScoreArray=deepClone(scoreArray)
console.log(newScoreArray) //[44, 23, 12, 14]
console.log(newScoreArray===scoreArray) //false

const myScoreobj=deepClone(scoreObj)
console.log(myScoreobj)
console.log(myScoreobj===scoreObj) //false