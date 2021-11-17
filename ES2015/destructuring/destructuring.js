//  Destructuring: Here’s how you used to have to extract values into variables.

//Destructuring + Spread

const userData = {
    username: 'smith',
    id: 12345,
    password: 'fiddlesticks',
    firstName: 'Angela',
    lastName: 'Smith',
    age: 'guess',
    isLegit: undefined
  };
  
  // extract the password key; collect the rest in 'user'
  const { password, ...user } = userData;
  
  console.log(user);
  /*
  {
    username: 'smith',
    id: 12345,
    firstName: 'Angela',
    lastName: 'Smith',
    age: 'guess',
    isLegit: undefined
  }
  */

//Defaults with destructuring
  const options = {
    refreshTime: 200
  }
  const { refreshTime = 750, waitTime = 1000 } = options;
  console.log(refreshTime); // 200 - initialized in options
  console.log(waitTime); // 1000 - fallback to default


//Renaming with destructuring
  const instructorData = {
    name: "Colt",
    job: "Instructor"
  }
  
  const { name: instructorName, job: occupation } = instructorData;
  
  instructorName // "Colt"
  occupation // "Instructor"

// combine renaming and defaults
  const {name:title='luke'}=instructorData

// Array destructuring
// with array, unlike objects, renaming doesn't matter, only position matters

const students=[
    {name: 'Drake', gpa: 4.6},
    {name: 'Henrietta', gpa: 4.4},
    {name: 'Tung', gpa: 4.0},
    {name: 'Harry', gpa: 3.8},
    {name: 'Ant', gpa: 3.2}
]

const [topStudent, secondBest, , fourth] =students
console.log(topStudent) //{name: 'Drake', gpa: 4.6}
console.log(secondBest) //{name: 'Henrietta', gpa: 4.4}
console.log(fourth) //{name: 'Harry', gpa: 3.8}

const [first, ...losers] =students
console.log(first) //{name: 'Drake', gpa: 4.6}
console.log(losers) //(4) [{…}, {…}, {…}, {…}]
                    // 0: {name: 'Henrietta', gpa: 4.4}
                    // 1: {name: 'Tung', gpa: 4}
                    // 2: {name: 'Harry', gpa: 3.8}
                    // 3: {name: 'Ant', gpa: 3.2}
                    // length: 4

//Destructuring functions

// quick example:
// function myFunc({name = "Xie", age=38}) {
//     let name = name;
//     let age = age;
//   }

const longJumpResults=['Tammy', 'Jessica', 'Violet']
const swimMeetResults=['Japan', 'France', 'Chile']

function awardMedals([gold, silver, bronze]){
    return {
        gold,
        silver,
        bronze
    }
}

console.log(awardMedals(longJumpResults)) //{gold: 'Tammy', silver: 'Jessica', bronze: 'Violet'}
console.log(awardMedals(swimMeetResults)) //{gold: 'Japan', silver: 'France', bronze: 'Chile'}


// Destructuring nested objects
const instructor = {
  id: 44,
  name: 'Colt',
  isHilarious: true,
  funFacts: {
    favoriteFood: 'Burrito',
    favoriteDrink: 'Old Fashioned',
  }
};
const {funFacts: {favoriteFood, favoriteDrink}} = instructor;
console.log(favoriteFood); // 'Burrito'


const movie={
    Ratings:[
        {Source: 'Internet movie database', Value:'8.3/10'},
        {Source: 'Rotten Tomatoes', Value:'93%'},
        {Source: 'Metacritic', Value:'88/100'},
    ]
}

const {Ratings:[imdb]}=movie
console.log(imdb)//{Source: 'Internet movie database', Value: '8.3/10'}

const {Ratings:[, rt]}=movie
console.log(rt) //{Source: 'Rotten Tomatoes', Value: '93%'}


const {Ratings:[{Value}]}=movie
console.log(Value) //8.3/10

const {Ratings:[{Value:imdbRating}]}=movie
console.log(imdbRating) //8.3/10

const {Ratings:[{Value:imdbbRating}, {Value:rtRating}, {Value:mRating}]}=movie
console.log(imdbbRating, rtRating,mRating) //8.3/10 93% 88/100


// swap

// 2-Line array value swap 
let a = 1;
let b = 3;
let both=[a, b];
[b, a]=both
console.log(a); // 3
console.log(b); // 1

//Fancy 1-Line Array Value Swap
let aa = 1;
let bb = 3;
[aa, bb] = [bb, aa];
console.log(aa); // 3
console.log(bb); // 1