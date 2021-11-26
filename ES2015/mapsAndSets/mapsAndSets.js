// Data structures in JavaScript
// * Data structures are formats for efficiently collecting or storing data
// So far we’ve seen Arrays and Objects
// ES2015 introduces two new ones, Maps and Sets

// Maps *****************************************
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
// Set and Get are the bread and butter.
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

// use functions as keys:
const add=(x, y)=>x +y
const mult=(x, y)=>x*y

const funcCalls=new Map()
funcCalls.set(add, 2) // pretent add function being called 1 times 
funcCalls.set(mult,7) 
console.log(funcCalls) // Map(2) {f=>2, f=>7}

//Another syntax we can use to make a map: pass in a array 
const bandData=[
    [3, '3 Doors Down'],
    ['three', 'Three Dog Night'],
    [41, 'Sum 41']
]

const bandMap=new Map(bandData)
console.log(bandMap) //Map(3) {3 => '3 Doors Down', 'three' => 'Three Dog Night', 41 => 'Sum 41'}

// And on the other side of things, we can take any map and turn it 
// back into an array using the spread operator
console.log([...bandMap])
// (3) [Array(2), Array(2), Array(2)]
// 0: (2) [3, '3 Doors Down']
// 1: (2) ['three', 'Three Dog Night']
// 2: (2) [41, 'Sum 41']

// When we wannna add something in to an existing map, we can chain set calls together
bandMap.set(182, 'Blink-182').set('twenty', 'Matchbox Twenty')
console.log(bandMap) //Map(5) {3 => '3 Doors Down', 'three' => 'Three Dog Night', 41 => 'Sum 41', 182 => 'Blink-182', 'twenty' => 'Matchbox Twenty'}

// "has" is used to check if a map contains something 
bandMap.has(41) // true
// "delete" deletes a pair based off of a particular key
bandMap.delete('twenty')  
bandMap.has('twenty') // false
console.log(bandMap) //Map(4) {3 => '3 Doors Down', 'three' => 'Three Dog Night', 41 => 'Sum 41', 182 => 'Blink-182'}
// "clear" emptys out a map entirely 
// bandMap.clear() 
// console.log(bandMap) //Map(0) {size: 0}
// Keys and values, these do exactly what they sound like:
// "keys" is used to get all of the keys from a given map
console.log(bandMap.keys()) //MapIterator {3, 'three', 41, 182}
// trun keys into an array:
console.log([...bandMap.keys()]) //(4) [3, 'three', 41, 182]
// "values" ...
console.log(bandMap.values()) //MapIterator {'3 Doors Down', 'Three Dog Night', 'Sum 41', 'Blink-182'}
// size
console.log(bandMap.size) //4  *object doesn't have size

//iterating maps:
// forEach *returns undefined
bandMap.forEach((val, key)=>{ //***  value first, and then key
    console.log(key+'=>'+val)
    // 3=>3 Doors Down
    // mapsAndSets.js:118 three=>Three Dog Night
    // mapsAndSets.js:118 41=>Sum 41
    // mapsAndSets.js:118 182=>Blink-182
})
// for of (can't be used on obj, bc objects are not interables, but maps are )
// for (let x of bandMap){
//     console.log(x) // only gives us arrays
//     // (2) [3, '3 Doors Down']
//     // (2) ['three', 'Three Dog Night']
//     // (2) [41, 'Sum 41']
//     // (2) [182, 'Blink-182']
// }
for (let [key, val] of bandMap){
    console.log(key+'='+val)
    // 3=3 Doors Down
    // three=Three Dog Night
    // 41=Sum 41
    // 182=Blink-182
}


// Sets *****************************************
// All values in a set are unique / sets only consisit of unique values.
// Any type of value can exist in a set
// Created using the new keyword
// Exist in quite a few other languages, ES2015 finally brings them to JavaScript

// 02 iterating maps  - finished

// create a set by passing an iterable 
const bannedHashTags=new Set(['notilter', 'justsaying', 'winning', 'yolo'])
console.log(bannedHashTags) //Set(4) {'notilter', 'justsaying', 'winning', 'yolo'}
// it only takes the first argument, everything else is ignored
const onlyFirstArg=new Set('hello', 'goodbye') //strings count as an iterable, so it iterates over each character and adds it to the set. 
// But we have a duplicate 2 ls, but we only end up with four elements.
console.log(onlyFirstArg) //Set(4) {'h', 'e', 'l', 'o'}

// add to a set
bannedHashTags.add('bestlife').add('selfie') // chain these together
console.log(bannedHashTags) //Set(6) {'notilter', 'justsaying', 'winning', 'yolo', 'bestlife', 'selfie'} 
// check if a value is in a set, it is a very common operation
console.log(bannedHashTags.has('yolo')) //true
console.log(bannedHashTags.has('tbt')) // false
// delete a specific element
bannedHashTags.delete('winning')
console.log(bannedHashTags) //Set(5) {'notilter', 'justsaying', 'yolo', 'bestlife', 'selfie'}
// clear the entire set
bannedHashTags.clear()
console.log(bannedHashTags) //Set(0) {size: 0}


// use a set to remove banned hashtags from a list of hashtags.
function filterHashTags(tags){
    const bannedHashTags2=new Set(['notilter', 'justsaying', 'winning', 'yolo'])
   return tags.filter((tag)=>!bannedHashTags2.has(tag)) //that's true or false, that gives us a Boolean value. Remember, filter is looking for a true value in order to filter that element out
}
const bonuTags=['happymonday', 'yolo', 'winning', 'sunset']
console.log(filterHashTags(bonuTags)) //(2) ['happymonday', 'sunset'] 
// you can also do that with a regular old array, and get the exact same output
function filterHashTagsWithOldArray(tags){
    const bannedHashTags2=['notilter', 'justsaying', 'winning', 'yolo']
   return tags.filter((tag)=>!bannedHashTags2.includes(tag))  
}
const bonuTagsWithOldArray=['happymonday', 'yolo', 'winning', 'sunset']
console.log(filterHashTagsWithOldArray(bonuTagsWithOldArray)) //(2) ['happymonday', 'sunset'] 
//Sets are not here to give you functionality when we didn't have before. But useing a set is much more efficient. 
//Without going into too much detail, the way that sets are implemented, 
// they are really fast at adding new values and checking if values exist in the set.
// Arrays are not terrible, but they are nowhere near as quick to check if a given value is present.
// In an array, we could have 1000 elements, and JS would check every single element or potentially 
// have to check every element. With a set, it’s a single operation, to check 
// if a value is included in the set.



//A another common use case for set is to remove duplicates from an array.

const ages=[43,23,12,44,4,12,23,12,5,45]
console.log(new Set(ages)) //Set(7) {43, 23, 12, 44, 4, 5, 45}
// turn it back to an array: spread that into an array bc a set is an iterable.
console.log([...new Set(ages)]) //7) [43, 23, 12, 44, 4, 5, 45]


// 04 sets basics finished