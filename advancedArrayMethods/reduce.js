// reduce: we're taking a group of values and then compressing them,
// boiling them down, reducing them into a single value.



// const planets = [
// 	{
// 		name            : 'Alderaan',
// 		rotation_period : 24,
// 		orbital_period  : 364,
// 		diameter        : 12500,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'grasslands, mountains',
// 		surface_water   : 40,
// 		population      : 2000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/5/',
// 			'https://swapi.dev/api/people/68/',
// 			'https://swapi.dev/api/people/81/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/1/'
// 		],
// 		created         : '2014-12-10T11:35:48.479000Z',
// 		edited          : '2014-12-20T20:58:18.420000Z',
// 		url             : 'https://swapi.dev/api/planets/2/'
// 	},
// 	{
// 		name            : 'Yavin IV',
// 		rotation_period : 24,
// 		orbital_period  : 4818,
// 		diameter        : 10200,
// 		climate         : 'temperate, tropical',
// 		gravity         : '1 standard',
// 		terrain         : 'jungle, rainforests',
// 		surface_water   : 8,
// 		population      : 1000,
// 		residents       : [],
// 		films           : [ 'https://swapi.dev/api/films/1/' ],
// 		created         : '2014-12-10T11:37:19.144000Z',
// 		edited          : '2014-12-20T20:58:18.421000Z',
// 		url             : 'https://swapi.dev/api/planets/3/'
// 	},
// 	{
// 		name            : 'Hoth',
// 		rotation_period : 23,
// 		orbital_period  : 549,
// 		diameter        : 7200,
// 		climate         : 'frozen',
// 		gravity         : '1.1 standard',
// 		terrain         : 'tundra, ice caves, mountain ranges',
// 		surface_water   : 100,
// 		population      : 'unknown',
// 		residents       : [],
// 		films           : [ 'https://swapi.dev/api/films/2/' ],
// 		created         : '2014-12-10T11:39:13.934000Z',
// 		edited          : '2014-12-20T20:58:18.423000Z',
// 		url             : 'https://swapi.dev/api/planets/4/'
// 	},
// 	{
// 		name            : 'Dagobah',
// 		rotation_period : 23,
// 		orbital_period  : 341,
// 		diameter        : 8900,
// 		climate         : 'murky',
// 		gravity         : 'N/A',
// 		terrain         : 'swamp, jungles',
// 		surface_water   : 8,
// 		population      : 'unknown',
// 		residents       : [],
// 		films           : [
// 			'https://swapi.dev/api/films/2/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:42:22.590000Z',
// 		edited          : '2014-12-20T20:58:18.425000Z',
// 		url             : 'https://swapi.dev/api/planets/5/'
// 	},
// 	{
// 		name            : 'Bespin',
// 		rotation_period : 12,
// 		orbital_period  : 5111,
// 		diameter        : 118000,
// 		climate         : 'temperate',
// 		gravity         : '1.5 (surface), 1 standard (Cloud City)',
// 		terrain         : 'gas giant',
// 		surface_water   : 0,
// 		population      : 6000000,
// 		residents       : [ 'https://swapi.dev/api/people/26/' ],
// 		films           : [ 'https://swapi.dev/api/films/2/' ],
// 		created         : '2014-12-10T11:43:55.240000Z',
// 		edited          : '2014-12-20T20:58:18.427000Z',
// 		url             : 'https://swapi.dev/api/planets/6/'
// 	},
// 	{
// 		name            : 'Endor',
// 		rotation_period : 18,
// 		orbital_period  : 402,
// 		diameter        : 4900,
// 		climate         : 'temperate',
// 		gravity         : '0.85 standard',
// 		terrain         : 'forests, mountains, lakes',
// 		surface_water   : 8,
// 		population      : 30000000,
// 		residents       : [ 'https://swapi.dev/api/people/30/' ],
// 		films           : [ 'https://swapi.dev/api/films/3/' ],
// 		created         : '2014-12-10T11:50:29.349000Z',
// 		edited          : '2014-12-20T20:58:18.429000Z',
// 		url             : 'https://swapi.dev/api/planets/7/'
// 	},
// 	{
// 		name            : 'Naboo',
// 		rotation_period : 26,
// 		orbital_period  : 312,
// 		diameter        : 12120,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'grassy hills, swamps, forests, mountains',
// 		surface_water   : 12,
// 		population      : 4500000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/3/',
// 			'https://swapi.dev/api/people/21/',
// 			'https://swapi.dev/api/people/36/',
// 			'https://swapi.dev/api/people/37/',
// 			'https://swapi.dev/api/people/38/',
// 			'https://swapi.dev/api/people/39/',
// 			'https://swapi.dev/api/people/42/',
// 			'https://swapi.dev/api/people/60/',
// 			'https://swapi.dev/api/people/61/',
// 			'https://swapi.dev/api/people/66/',
// 			'https://swapi.dev/api/people/35/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/5/',
// 			'https://swapi.dev/api/films/4/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:52:31.066000Z',
// 		edited          : '2014-12-20T20:58:18.430000Z',
// 		url             : 'https://swapi.dev/api/planets/8/'
// 	},
// 	{
// 		name            : 'Coruscant',
// 		rotation_period : 24,
// 		orbital_period  : 368,
// 		diameter        : 12240,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'cityscape, mountains',
// 		surface_water   : 'unknown',
// 		population      : 1000000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/34/',
// 			'https://swapi.dev/api/people/55/',
// 			'https://swapi.dev/api/people/74/'
// 		],
// 		films           : [
// 			'https://swapi.dev/api/films/5/',
// 			'https://swapi.dev/api/films/4/',
// 			'https://swapi.dev/api/films/6/',
// 			'https://swapi.dev/api/films/3/'
// 		],
// 		created         : '2014-12-10T11:54:13.921000Z',
// 		edited          : '2014-12-20T20:58:18.432000Z',
// 		url             : 'https://swapi.dev/api/planets/9/'
// 	},
// 	{
// 		name            : 'Kamino',
// 		rotation_period : 27,
// 		orbital_period  : 463,
// 		diameter        : 19720,
// 		climate         : 'temperate',
// 		gravity         : '1 standard',
// 		terrain         : 'ocean',
// 		surface_water   : 100,
// 		population      : 1000000000,
// 		residents       : [
// 			'https://swapi.dev/api/people/22/',
// 			'https://swapi.dev/api/people/72/',
// 			'https://swapi.dev/api/people/73/'
// 		],
// 		films           : [ 'https://swapi.dev/api/films/5/' ],
// 		created         : '2014-12-10T12:45:06.577000Z',
// 		edited          : '2014-12-20T20:58:18.434000Z',
// 		url             : 'https://swapi.dev/api/planets/10/'
// 	},
// 	{
// 		name            : 'Geonosis',
// 		rotation_period : 30,
// 		orbital_period  : 256,
// 		diameter        : 11370,
// 		climate         : 'temperate, arid',
// 		gravity         : '0.9 standard',
// 		terrain         : 'rock, desert, mountain, barren',
// 		surface_water   : 5,
// 		population      : 100000000000,
// 		residents       : [ 'https://swapi.dev/api/people/63/' ],
// 		films           : [ 'https://swapi.dev/api/films/5/' ],
// 		created         : '2014-12-10T12:47:22.350000Z',
// 		edited          : '2014-12-20T20:58:18.437000Z',
// 		url             : 'https://swapi.dev/api/planets/11/'
// 	}
// ];

const nums = [ 20, 30, 50, 12, -2, 45, 99, 19, 22, 85 ];
// to get total without reduce 
let total = 0;
for (let num of nums) {
	total += num;
}
console.log(total);
// to get min without reduce 
let min = nums[0];
for (let i = 1; i < nums.length; i++) {
	if (nums[i] < min) min = nums[i];
}
console.log(min);
// to reduce it down to an object that contained frequencies of each letter wihout reduce
const str = 'lollapalooza';
const charFreq = {};
for (let char of str) {
	if (charFreq[char]) {
		charFreq[char] += 1;
	}
	else {
		charFreq[char] = 1;
	}
}

// reduce:
// Whatever is returned from the callback function, becomes the new value of the accumulator!

// Accepts a callback function and an optional second parameter
// Iterates through an array
// Runs a callback on each value in the array
// The first parameter to the callback is either the first value in the array or the optional second parameter
// The first parameter to the callback is often called “accumulator”
// The returned value from the callback becomes the new value of accumulator
const words = [ 'hello', 'I', 'love', 'you' ];
const result = words.reduce(function(accum, nextWord) {
	console.log(accum, nextWord);
	return accum + nextWord;
});
// accum:     nextWord:
// hello        I
// helloI       love
// helloIlove   you

const midtermScores = [ 70, 88, 93, 94, 64, 62, 56 ];
const finalsScores = [ 92, 93, 76, 77, 78, 59, 61 ];
// const minScore = midtermScores.reduce(function(min, nextScore) {
// 	if (nextScore < min) {
// 		return nextScore;
// 	}
// 	return min;
// });

const minMidtermScore = midtermScores.reduce(function(min, nextScore) {
	return nextScore < min ? nextScore : min;
});
const maxScore = midtermScores.reduce(function(max, nextScore) {
	return nextScore > max ? nextScore : max;
});

// const minFinalsScore = finalsScores.reduce(function(min, nextScore) {
// 	return nextScore < min ? nextScore : min;
// });
const minOverallScore = finalsScores.reduce(function(min, nextScore) {
	return nextScore < min ? nextScore : min;
}, minMidtermScore);


// reduce exercise:
/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractValue(arr, key){
    return arr.reduce(function(acc,next){
        acc.push(next[key]);
        return acc;
    },[]);
}
 
// init:
function extractValue(arr, key) {
    return arr.reduce((acc, a)=>{
       acc.push(a[key])
       return acc
    },[])
  }
  
      
  console.log("-----------------------------------")
  console.log(extractValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}],'name')) // ['Elie', 'Tim', 'Matt', 'Colt']


  /*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str){
    const vowels = "aeiou";
    return str.split('').reduce(function(acc,next){
        let lowerCased = next.toLowerCase()
        if(vowels.indexOf(lowerCased) !== -1){
            if(acc[lowerCased]){
                acc[lowerCased]++;
            } else {
                acc[lowerCased] = 1;
            }
        }
        return acc;
    }, {});
}

//init:
function vowelCount(str) {
    const vowel="aeiou"
    return str.split("").reduce(function(acc, letter){
      let lwLetter=letter.toLowerCase()
      if(vowel.indexOf(lwLetter)!==-1){
        if(lwLetter in acc){
          acc[lwLetter]+=1
        }else{
          acc[lwLetter]=1
        }
      }
      return acc
    },{})
  }
      
  console.log("-----------------------------------")
  console.log(vowelCount('I Am awesome and so are you'))
  



/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    addKeyAndValue(arr, 'title', 'Instructor') // 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(acc,next,idx){
        acc[idx][key] = value;
        return acc;
    },arr);
}

// init:
function addKeyAndValue(arr, key, value) {
    return arr.reduce(function(list, curr){
      return [...list, {...curr, [key]:value}]
    },[])
  }
  
  const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
  
      
  console.log("-----------------------------------")
  console.log(addKeyAndValue(arr, 'title', 'Instructor'))// 


    
/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
    
    function isEven(val){
        return val % 2 === 0;
    }
    
    const arr = [1,2,3,4,5,6,7,8];
    
    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    const names = ['Elie', 'Colt', 'Tim', 'Matt'];
    
    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, cb){
    return arr.reduce(function(acc,next){
        if(cb(next)){
            acc[0].push(next);
        } else {
            acc[1].push(next);
        }
        return acc;
    }, [[],[]]);
}

//init:
const names = ['Elie', 'Colt', 'Tim', 'Matt'];

function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
function partition(arr, callback) {
  return arr.reduce(function(acu, cur){
    if(callback(cur)){
      acu[0]= [...acu[0], cur]
    }else{
      acu[1]=[...acu[1], cur]
    }
    return acu
  },[[],[]])
}


    
console.log("-----------------------------------")
console.log(partition(names, isLongerThanThreeCharacters)) 