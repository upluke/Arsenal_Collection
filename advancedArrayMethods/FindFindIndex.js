
// When You Would Use Find
// You need to determine if a value in an array exists and you have to determine this by using a callback
// A simple alternative to using filter and accessing the first element of the filtered array


// When You Would Use Findindex
// You need to determine the index of a value in an array if it exists and you have to determine this by using a callback
// A better version of indexOf to be used when a callback is necessary

const scores = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	55,
	59,
	69,
	73,
	73,
	75,
	79,
	83,
	88,
	91,
	93
];

scores.find(function(score) {
	return score > 75;
});
//79

scores.find(function(score) {
	return score !== 0 && score % 2 === 0;
});
//88

//If you need to find ALL, use filter:
const evenScores = scores.filter(function(score) {
	return score % 2 === 0;
});
//[0, 0, 0, 0, 0, 0, 0, 0, 88]

const firstEven = scores.findIndex(function(score) {
	return score !== 0 && score % 2 === 0;
});
//16

scores.findIndex(function(score) {
	return score > 100;
});

function partition(arr, pivot) {
	//Find the index we'll use to pivot around
	const pivotIdx = arr.findIndex(function(el) {
		return el > pivot;
	});
	//create 2 new arrays, using that pivotIdx we just found
	const left = arr.slice(0, pivotIdx);
	const right = arr.slice(pivotIdx);
	//return both arrays as a single array:
	return [ left, right ];
}
//partition(scores, 0)
//Returns...
// [
//   [ 0, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 55, 59, 69, 73, 73, 75, 79, 83, 88, 91, 93 ]
// ];

// *********************************
// Writing Our Own Versions
// *********************************
function myFind(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i], i, arr) === true) return arr[i];
	}
}

myFind(scores, function(score) {
	return score > 91;
});

myFind(scores, function(score) {
	return score > 100;
});

function myFindIndex(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i], i, arr) === true) return i;
	}
	return -1;
}

myFindIndex(scores, function(score) {
	return score !== 0 && score % 2 == 0;
});




// exercise:
/* 
Write a function called `findUserByUsername` which accepts an array of objects, each with a key of username, and a string. The function should return the first object with the key of username that matches the string passed to the function. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

findUserByUsername(users, 'mlewis') // {username: 'mlewis'}
findUserByUsername(users, 'taco') // undefined
*/
function findUserByUsername(usersArray, username) {
	return usersArray.find(function(user){
	  return user.username === username;
	})
  }
//init:
function findUserByUsername(usersArray, username) {
	return usersArray.find(obj=>obj.username===username)
  }
  
  const users = [
	{username: 'mlewis'},
	{username: 'akagen'},
	{username: 'msmith'}
  ];
  console.log(findUserByUsername(users, 'taco'))
  
  
  /*
  Write a function called `removeUser` which accepts an array of objects, each with a key of username, and a string. The function should remove the object from the array. If the object is not found, return undefined. 
  
  const users = [
	{username: 'mlewis'},
	{username: 'akagen'},
	{username: 'msmith'}
  ];
  
  removeUser(users, 'akagen') // {username: 'akagen'}
  removeUser(users, 'akagen') // undefined
  */
  
  function removeUser(usersArray, username) {
	let foundIndex = usersArray.findIndex(function(user){
	  return user.username === username;
	})
	if(foundIndex === -1) return;
  
	return usersArray.splice(foundIndex,1)[0];
  }
  //init:
  function removeUser(usersArray, username) {
	const idx= usersArray.findIndex(obj=>obj.username===username)
	return usersArray[idx]
  }
  
   
  
  
  console.log(removeUser(users, 'akagen'))