let person1 = {
    fname: 'Digbijaya',
    lname: 'Biswal',
    greet: function (city){
        console.log("I am " + this.fname + " " + this.lname + " from " + city);
    }
}

person1.greet();

let person2 = {fname: 'Sai', lname: 'Rout'}

//🎯 When to Use
// 1. When you want to borrow a method from another object
// Call greet from person1, but make it use person2's context
person1.greet.call(person2, 'Bhubaneswar');
// apply() is similar to call(), but takes an array of arguments
person1.greet.apply(person2, ['Bhubaneswar']);
// Using bind() to create a new function with a specific context
let boundGreet2 = person1.greet.bind(person2, 'Bhubaneswar');
boundGreet2(); // I am Sai Rout from Bhubaneswar

// 2. When using a generic function and you want to control the this context
// For example, if you have a function that needs to be called with a specific context
function greet(city) {
    console.log("I am " + this.fname + " " + this.lname + " from " + city);
}
// Using call
greet.call(person1, 'Bhubaneswar');
// Using apply
greet.apply(person1, ['Bhubaneswar']);
// Using bind
let boundGreet = greet.bind(person1, 'Bhubaneswar');
console.log(boundGreet); // [Function: bound greet]
boundGreet(); // I am Digbijaya Biswal from Bhubaneswar

//bind() returns a new function with this permanently set.

// The difference between call, apply, and bind is:
// - call() and apply() invoke the function immediately with the specified context.
// - call() takes arguments separately, while apply() takes an array of arguments.
// - bind() returns a new function with the specified context, which can be called later.


// --------------------------------Real-world Example----------------------------------------//

//💼  NodeList is not a real array
//When you select elements with document.querySelectorAll, it gives you a NodeList, not an actual array.

const divs = document.querySelectorAll("div");
console.log(Array.isArray(divs)); // ❌ false
// This means you can't use array methods like forEach, map, filter directly on it.
//To be safe, we often convert the NodeList to an array.

// Solution 1: Use Array.prototype.slice.call()
const divs2 = document.querySelectorAll("div");
const divArray = Array.prototype.slice.call(divs2);

divArray.forEach((div) => {
  div.style.color = "blue";
});
//slice.call(divs) "borrows" the array's .slice() method and applies it to divs.


//Solution 2- To convert NodeList to an array, you can use Array.from or the spread operator.
const divsArray = Array.from(divs);
console.log(Array.isArray(divsArray)); // ✅ true

