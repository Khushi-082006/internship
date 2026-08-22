const fisstName = "khushi";
const lastName = "jangra";
const hobby = "painting";
let age = 19;
let fullBio = `hello , my name is ${fisstName} ${lastName}. I am ${age} years old and i love ${hobby}. `;
console.log(fullBio);
age = age + 1;
fullBio = `hello , my name is ${fisstName} ${lastName}. I am ${age} years old and i love ${hobby}. `;
console.log(fullBio);


function multiplyNumbers(a, b) {
    return a * b;
}
let divideNumbers = (a, b) => {
    return a / b;
}
let result = multiplyNumbers(10, 5);
console.log("The result of multiplication is: " + result);
console.log("the result of divide :", divideNumbers(5, 10));
//type coresion
let val1 = "10";
let val2 = 5;

console.log(val1 + val2);//concatenate both (105) as string
console.log(val1 - val2);//implicit type change  5 as no
console.log("5" * "2"); //chnage both in number as multipy work with number  10 


//snippet 2
//variable scope
let hero = "Batman";
function showHero() {
    let hero = "Iron Man";
    console.log("Inside function:", hero);//iron man
}
showHero();
console.log("Outside function:", hero);//batman

//snippet 3
let course = "JavaScript";

if (true) {
    let course = "React";
    console.log("Inside block:", course);//react
}

console.log("Outside block:", course);//javascript

//snippet 4

let item = "Laptop";
let price = 1200;
let tax = 50;

console.log("Total is: " + price + tax);//concat  120050
console.log(`Total is: ${price + tax}`);//string interpolation 1250

//snippet 5
let text = "Hello";

text[0] = "Y";

console.log(text);//string is immutable so hello

//snippet 6
//tye coercion
console.log(true + true);//boolean values convert to numbers   2
console.log(false + 5);//5
console.log("10" + true);//10true
console.log("10" - true);//The - operator forces numeric conversion 9
console.log(null + 5);//null converts to 0 5

//snippet 7
console.log("5" + 2 + 3);//523
console.log(2 + 3 + "5");//55


//snippet 8
console.log(undefined == null);//true
console.log(undefined === null);//false



//snippet 9
let different = "5";

{
    console.log(d);//5

    {
        let d = 10;
        console.log(d);//10
    }

    console.log(d);//5
}

console.log(a);//5

//snippet 10

var a = "Global";

{

    let a = "Block";

    {
        console.log(a);//block

        var b = "JavaScript";

        {
            let a = "Inner";
            console.log(a);//inner
            console.log(b);//javascript
        }

        console.log(a);//block
    }

    console.log(a);//block
}

console.log(a);//global
console.log(b);//javascript
