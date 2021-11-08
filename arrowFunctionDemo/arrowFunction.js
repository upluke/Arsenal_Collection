// Arrow Functions Summary:
// Can only be used as shorthand for anonymous function expressions
// Must put parentheses around parameters if there are 0 or 2+ parameters



const dailyRainTotals=[[1,2, 0.35, 2.2], [1.7, 0.6, 0.1], [2.5, 0.9, 1.5]]
const res=dailyRainTotals.map(hourlyRainTotals=>hourlyRainTotals.reduce((sum, inchesOfRain)=>sum+=inchesOfRain))
console.log(res)

// Return statement is implied if you leave out curly braces
const makeMath=(num)=>({
    square: num*num,
    double:num*2
})


// They do not make their own this


const cat ={
    name:'Bubs',
    meow: function(){// function expression 
        return `${this.name} says MEOW!`; // "Bubs syas MEOW!"
    }
}

const cat2 ={
    name:'Bubs',
    eat: function(){ // cat2.eat() => {name: 'Bubs', eat: ƒ, meow: ƒ}
        console.log(this) // Babel: this
        return `${this.name} chows down` //'Bubs chows down'
    },
    meow: ()=>{// arrow funciton expression  =>Window {window: Window, self: Window, document: document, name: '', location: Location, …}
        console.log(this) // Babel: _this
        return `${this.name} says MEOW!`; // " syas MEOW!"
    }
}


// arguments don't exist in arrow functions
const myFunc=()=>{
    console.log(arguments) // Uncaught ReferenceError: arguments is not defined 
}