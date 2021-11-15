// Object Methods
// A nice shorthand when a key in an object represents a function.

const mathStuff={
    x:200,
    add: function(a,b){
        return a+b
    },
    square:function(a){
        return a*a
    }
}

const mathStuff2={
    x:200,
    add(a,b){ //!! do NOT use arrow functions here, bc arrow func is not named
        return a+b
    },
    square(a){
        return a*a
    },
    multiply:(a,b)=>{ // but you can do arrow functions this way
        return a*b
    }
}


// Computed Property Names
// ES2015 allows us to create an object with a key that JavaScript can compute at definition.

// let's say we want to make an object that we could look up the hex code 
// based off of the name, or we could go the other way and loop up 
// the name based off of the hex code.

// 'periwinkle', '9c88ff'
// 'bright ube', 'D6A2E8'

// concept:
// const color={
//     periwinkle: '9c88ff',
//     '9c88ff': 'periwinkle' 
// }

// if we just create a function to simple return them, it won't work
function makeColor(name, hex){
    return {
        name:hex,
        hex:name
    }
}
//name and hex are supposed to be dynamic
makeColor('bright ube', 'D6A2E8') //{name: 'D6A2E8', hex: 'bright ube'}

// what we did in the past
function makeColor2(name, hex){
    const color={}
    color[name]=hex;
    color[hex]=name;
    return color;
}
makeColor2('bright ube', 'D6A2E8') //{bright ube: 'D6A2E8', D6A2E8: 'bright ube'}

// what we do right now:
function makeColor2(name, hex){
  return {
      [name]:hex,
      [hex]:name
  } 
}
makeColor2('bright ube', 'D6A2E8') //{bright ube: 'D6A2E8', D6A2E8: 'bright ube'}

// we can also write code insdie of these brackets, and code will be evaluated

const mystery={
    [6+7]:'thirteen' 
}

// code behind scene
function _defineProperty(obj, key, value){
    if(key in obj){
        Object.defineProperty(obj, key, {
            value:value,
            enumerable: true,
            configurable: true,
            writable:true
        })
    }
    else{
        obj[key]=value
    }
    return obj
}

var mystery=_defineProperty({}, 6+7, 'thirteen')