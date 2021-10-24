let foo="a"

function Test(){
    let foo="yes"
    console.log(foo)
}

console.log(foo)

const zoo=["pig", "panda", "monkey", "bat"]

for (let animal of zoo){

    console.log(animal)
}

const employee={'id':123, "name":"Rose", "skills":Test}
for(let key in employee){
    if (key==="skills"){
        console.log(employee[key]())
    }
    
}


// print([]===[])

function add(num1, num2){
    try {
        num1+num2+num3
        throw new Error("no no")
    } catch (error) {
        console.log(error)
    }finally{
        console.log("we get to the end")
    }
    
}

function displayInitials(user){
   
    try {
        const firstName=user[0].toUpperCase()
 
        const lastName=user[2].toUpperCase() // TypeError: Cannot read properties of undefined (reading 'toUpperCase')
        return `hello ${firstName}, ${lastName}` 
    } catch (error) {
        console.log(error)
    }
     

}


