// Data structures in JavaScript
// * Data structures are formats for efficiently collecting or storing data
// So far we’ve seen Arrays and Objects
// ES2015 introduces two new ones, Maps and Sets

// Maps
// Also called “hash maps” in other languages
// Until ES2015 - objects were replacements for maps
// Similar to objects, except the keys can be ANY data type!
// Created using the new keyword

// ** Let's compare Map to an object:

// when we use obj, all of our keys will be turned into strings
const myObj={}
myObj[true]='True!' // if you try and access myObj of true, it does work, 
//but that's bc it's takeing this value and converting it to a string
// and tring to find the corresponding string in this object. 
//So that can work for things like booleans or numbers, 
//where it doesn't work is if I had an array or an object or a function that I wanted to store as a key:
const myKey={} // an empty object
// if we want to add myKey as a key into my object, JS is truning this myKey which is itself 
//an object into a string or representation and using that as a key
myObj[myKey]='AN OBJECTTTTT'
console.log(myObj) //true:'True!', [object Object]:'AN OBJECTTTTT' 
// now let's read out the data by passing in any empty object, you'll still get the same output. Behind the scenes it takes that key
// and turned it into a string, which means that any object i passed in would amtch this key,
// because they will be converted to strings. So this is not a true map!!
// You're not able to use an object or another array, a funciton as keys, at least not in a reliable way
console.log(myObj[{}])// [object Object]:'AN OBJECTTTTT' 
const anotherRandomObj={stuff:1, otherStuff:4}
console.log(myObj[anotherRandomObj])// [object Object]:'AN OBJECTTTTT' 

//unlike array or object, we don't have a literal syntax for maps
// instead we have to use the new keyword Map 
let firstMap = new Map();
// to add a key value pair, there's a method called set(key, value)
firstMap.set(1, 'Ash');
firstMap.set(false, 'a boolean');
firstMap.set('nice', 'a string');
firstMap.delete('nice'); // true
firstMap.size; // 2
// Keys can be any type!
let arrayKey = []; // store a reference to empty array
firstMap.set(arrayKey, [1,2,3,4,5]);  

let objectKey = {};
firstMap.set(objectKey, {a:1});
// use get to retrieve a value
firstMap.get(1); // 'Ash'
firstMap.get(false); // 'a boolean'
firstMap.get('false') // undefined      Note: false and 'false' are entirely diffrent values, JS doesnt conflate them
firstMap.get(arrayKey); // [1,2,3,4,5]
firstMap.get(objectKey); // {a:1}

// you could store an empty array as one of the keys (unlike on line 44 and 47, they store a reference to it), but there's a problem with this
firstMap.set([], 'empty array!')
firstMap.get([]) // undefined
// Why are we getting undefined? Remember arrays are reference types 
// which means [] === [] gives us false. They are different unique arrays
// they look the same and they're both empty, but hey are differetn as far as how they're 
// stored and the acutal references to those arrays.