// Q1: Same keys and values
// function createInstructor(firstName, lastName){
//   return {
//     firstName: firstName,
//     lastName: lastName
//   }
// }

// Same keys and values ES2015
/* Write an ES2015 Version */
const createInstructor=(firstName, lastName)=>({
    firstName, lastName
  })
  
  console.log(createInstructor('Jenny', 'Lucy'))
  
  
  
  // Q2: Computed Property Names
  // var favoriteNumber = 42;
  
  // var instructor = {
  //   firstName: "Colt"
  // }
  
  // instructor[favoriteNumber] = "That is my favorite!"
  
  
  // Computed Property Names ES2015
  /* Write an ES2015 Version */
  
  // init:
  const favoriteNumber = 42;
  
  const instructor = {
    firstName: "Colt"
  }
  
  instructor.favoriteNumber= "That is my favorite!"
  console.log(instructor)
  
  // solution:
  let favoriteNumber = 42;
  
  const instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
  }
  
  
  
  // Q3: Object Methods
  // var instructor = {
  //   firstName: "Colt",
  //   sayHi: function(){
  //     return "Hi!";
  //   },
  //   sayBye: function(){
  //     return this.firstName + " says bye!";
  //   }
  // }
  
  // Object Methods ES2015
  /* Write an ES2015 Version */
  var instructor2 = {
    firstName: "Colt",
    sayHi(){
      return "Hi!";
    },
    sayBye(){
      return this.firstName + " says bye!";
    }
  }
  
  console.log(instructor2)
  
  
  // createAnimal function
  // Write a function which generates an animal object. The function should accepts 3 arguments:
  
  // species: the species of animal (‘cat’, ‘dog’)
  // verb: a string used to name a function (‘bark’, ‘bleet’)
  // noise: a string to be printed when above function is called (‘woof’, ‘baaa’)
  // Use one or more of the object enhancements we’ve covered.
  
  // const d = createAnimal("dog", "bark", "Woooof!")
  // // {species: "dog", bark: ƒ}
  // d.bark()  //"Woooof!"
  
  // const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
  // // {species: "sheep", bleet: ƒ}
  // s.bleet() //"BAAAAaaaa"
  
  
  const createAnimal=(species, verb, noise)=>({
    species,
    [verb](){
      console.log(noise)
    }
  })
  
  const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
  console.log(s)
  s.bleet() //"BAAAAaaaa"
  // http://curric.rithmschool.com/springboard/exercises/js-object-enhancements/solution/index.html