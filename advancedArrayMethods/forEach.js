// Loops through an array
// Runs a callback function for each value in the array and then returns undefined
// forEach will always return undefined - no matter what
// forEach came out before for of 


// built our own foreach function (return undefined)
function forEach(arr, callback){
    for(let i=0;i<arr.length;i++){
      callback(arr[i], i, arr)
    }
  }
  
  colors=['teal', 'cyan', 'peach', 'purple']
  
  forEach(colors, function(color, i){
    console.log(color.toUpperCase(), 'at idx of: ', i)
  })
  
  // vs 
  // built in foreach
  colors.forEach(function(color, i){
    console.log(color.toUpperCase(), 'at idx of: ', i)
  })