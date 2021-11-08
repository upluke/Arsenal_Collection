// In JS, every function created using the function keyword 
//has access to a special keyword called arguments
function displayArguments(){
    console.log("The first argument is", arguments[0])
    return `You passed in ${arguments.length} arguments!`
  }
  
  displayArguments(1,2)  // "The first argument is 1"
  displayArguments()  // "The first argument is undefined"



// But you cannot use arguments with arrow functions
function myFunc(){
    console.log(arguments) // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
const myFunc2=()=>{
    console.log(arguments) // ReferenceError: arguments is not defined
}


// The problem
// Unfortunately, arguments is not an actual array, it is an “array-like-object”
// It has a length property and can be accessed at a specific index, 
// but does not have build in array methods like map, filter, etc.
function doubleArgs(){
    return arguments.map(function(arg){
      return arg * 2
    })
  }
  
  doubleArgs(1,2)  // Uncaught TypeError: arguments.map is not a function


// So what did we do?
// We turned the array-like-object into an array, 
// by making a copy of an array and setting the target of the copy to be the arguments array-like-object

// in the past， kind gross way:
//We turned the array-like-object into an array, by making a copy of an array and
//setting the target of the copy to be the arguments array-like-object
function doubleArgs(){
    let arrayFromArguments = [].slice.call(arguments)
    return arrayFromArguments.map(function(arg){
      return arg * 2
    })
  }
  
  doubleArgs(1,2)  // [2, 4]

// or a better way later
function doubleArgs2(){
    let arrayFromArguments =Array.from(arguments)
    return arrayFromArguments.map(function(arg){
      return arg * 2
    })
  }
  
  doubleArgs(1,2)  // [2, 4]

// also works on array funcitons
const max = function(){
    const args=Array.from(arguments);
    return args.reduce((max, currVal)=>{
        return currVal>max? currVal: max
    })
}


// Introducing Rest 
//When the three dots are part of a function definition, we call the operator the “rest” operator
//The rest operator is the last parameter defined in a function and will evaluate to an array of all additional arguments passed in

// whatever you name the argument (in the following case we name it "sums") will be contrasted with the arguments object,
// where it wasn't an array, then we turned it into an array with rest operator,
// and then we could use array methods

function sum(...sums){
    return sums.reduce((sum, n)=>sum+n)
}
sum(1,2,3,4,5) // 15

// This also works insid of array functions
const sum2=(...sums)=>{
    // if (!sums.length) return undefined   // to see if values are pased in by giving a default value or give reduce a inital value
    return sums.reduce((sum, n)=>sum+n)
}



// Collecting Remaining Arguments
// You can also specify several named parameters and collect the rest.

function makeFamily(parent1, parent2, ...kids){
    return {
        parents: [parent1, parent2],
        children: kids.length? kids: 0
    }
}

makeFamily('judy', 'pamela') //{parents: Array(2), children: 0}
                             // children: 0
                             // parents: (2) ['judy', 'pamela']
makeFamily('judy', 'pamela', 'bonnie', 'junior') //{parents: Array(2), children: Array(2)}
                                                 // children: (2) ['bonnie', 'junior']
                                                 // parents: (2) ['judy', 'pamela']


// more example
function filterByType(type, ...options){
    return options.filter(option=> typeof option===type )
}                                            
filterByType('number',1,2,'a',true,3) //[1, 2, 3]


// Rest parameter must be last formal parameter, it collects the rest
function printStuff(a,b, ...rest, c){ // error, "unexpected token, expected )", bc once it encounters rest, 
    //it assumes after those three dots and then your identifier, 
    //the name of the array that you're creating, it assumes it should hit the end of that parameter list. And it didin't.

}