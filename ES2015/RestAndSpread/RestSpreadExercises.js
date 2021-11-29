
// Q1: Refactor it to use the rest operator & an arrow function:

// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   console.log(nums)
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }

//init:
const filterOutOdds = (...args) => args.filter(v => v % 2 === 0)
// solution:
const filterOutOdds = (...args) => args.filter(v => v % 2 === 0)

console.log(filterOutOdds(1,2,3,4,5))
console.log("---------------------Q1----------------------------")


// Q2: findMin
// Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.

// Make sure to do this using the rest and spread operator.

// findMin(1,4,12,-3) // -3
// findMin(1,-1) // -1
// findMin(3,1) // 1


//init:
const findMin=(...args)=> args.reduce((acc, cur)=> acc>cur? acc=cur: acc)
// solution:
const findMin = (...args) => Math.min(...args)

console.log(findMin(1,4,12,-3))
console.log("---------------------Q2----------------------------")


// Q3: mergeObjects
// Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

// mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

//init:
const mergeObjects=(obj1, obj2)=>({...obj1, ...obj2})
// solution:
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})

console.log(mergeObjects({a:1, b:2}, {c:3, d:4}) )
console.log("---------------------Q3----------------------------")

// Q4: doubleAndReturnArgs
// Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.

// doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
// doubleAndReturnArgs([2],10,4) // [2, 20, 8]


// const doubleAndReturnArgs=(arr, ...restArgs)=>{ 
//   const secondArg= restArgs.map(num=>num*2)
//   return [...arr, ...secondArg]
// }

//init:
const doubleAndReturnArgs=(arr, ...restArgs)=>[...arr, ...restArgs.map(num=>num*2)]
// solution:
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(v => v *2)]

console.log(doubleAndReturnArgs([2],10,4))
console.log("---------------------Q4----------------------------")

//Slice and Dice!
// For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!
// Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** Q5: remove a random element in the items array
and return a new array without that item. */

//init:
const removeRandom =items=> {
  const ranIdx = Math.floor(Math.random()*items.length)
  return items.filter((item, idx)=>ranIdx!==idx)
}
// solution:
const removeRandom = items => {
  let idx = Math.floor(Math.random() * items.length);
  return [...items.slice(0, idx), ...items.slice(idx + 1)];
}


console.log(removeRandom([1,2,3,4,5]))
console.log("---------------------Q5----------------------------")


/** Return a new array with every item in array1 and array2. */
// init:
const extend=(array1, array2)=>[...array1, ...array2]
// solution:
const extend = (array1, array2) => {
  return [...array1, ...array2];
}
console.log(extend([1,2,3],[4,5,6]))
 
console.log("--------------------------------------------------")
/** Return a new object with all the keys and values
from obj and a new key/value pair */

// init:
function addKeyVal(obj, key, val) {
  const resObj={...obj}
  resObj[key]=val
  return resObj
}
// solution:
const addKeyVal = (obj, key, val) => {

  // OPTION 1
  let newObj = { ...obj }
  newObj[key] = val;
  return newObj;

  // OPTION 2 (uses an object enhancement you'll see in the next unit)
  // return { ...obj, [key]: val };
}

console.log(addKeyVal({name: "Kelly"}, "age", 34))
console.log("--------------------------------------------------")

/** Return a new object with a key removed. */

//init:
function removeKey(obj, key) {
  const resObj={...obj}
  delete resObj[key]
  return resObj
}
// solution:
const removeKey = (obj, key) => {

  // OPTION 1
  let newObj = { ...obj }
  delete newObj[key]
  return newObj;

  // OPTION 2 (uses an object enhancement you'll see in the next unit)
  // ({ [key]: undefined, ...obj } = obj);
  // return obj;
}
console.log(removeKey({ name: 'Kelly', age: 34 }, "name"))
console.log("--------------------------------------------------")


/** Combine two objects and return a new object. */

//init:
function combine(obj1, obj2) {
  return {...obj1, ...obj2}
}
//solution:
const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
}
console.log(combine({ name: 'Kelly', age: 34 }, { occupation: 'teacher' } ))
console.log("--------------------------------------------------")

/** Return a new object with a modified key and value. */

//init:
function update(obj, key, val) {
  const resObj={obj}
  obj[key]=val
  return resObj  
}
//solution:
const update = (obj, key, val) => {

  // OPTION 1

  let newObj = { ...obj }
  newObj[key] = val;
  return newObj;

  // OPTION 2 this uses an object enhancement you'll see in the next unit)
  // return { ...obj, [key]: val };
}
console.log(update({ name: 'Kelly', age: 34 }, "age", 50))

