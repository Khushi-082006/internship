/*
//Assignment
const fisstName ="khushi";
const lastName="jangra";
const hobby="painting";
let age=19;
let fullBio=`hello , my name is ${fisstName} ${lastName}. I am ${age} years old and i love ${hobby}. `;
console.log(fullBio);
age=age+1;
fullBio=`hello , my name is ${fisstName} ${lastName}. I am ${age} years old and i love ${hobby}. `;
console.log(fullBio);


function multiplyNumbers (a,b){
    return a*b;
}
let divideNumbers=(a,b)=>{
    return a/b;
}
let result=multiplyNumbers(10,5);
console.log("The result of multiplication is: " + result);
console.log("the result of divide :",divideNumbers(5,10));
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
/*let a = "5";

{    console.log(a);//5

    {
        let a = 10;
        console.log(a);//10
    }

    console.log(a);//5
}

console.log(a);//5*/

//snippet 10
/*
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


//objects
let student = {
    name: "Khushi",
    age: 19,
    course: "BCA"
    //display:function (){ console.log("name")

   // }
};
student["ukg"]=6;student.heiht=7;
console.log(student);
console.log(student.name)//khushi
;
console.log(student["name"]);//khushi
let contact="age";
console.log(student.contact);//undefined
console.log(student[contact])//19
;
delete student.ukg;
console.log(student.ukg);//undefined
const person=student;
person.age=35;
console.log(person===student);
console.log(person.age);

console.log(student.age);// will print same value since shallow copy is done as person has reference of student 
let ab={}
 let bc={}    
console.log(a==b)//false cause both have different address
   

*//*

function calculate(a, b, operation) {
    let result = operation(a, b);
    console.log(result);

}
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
calculate(10,5,add);
calculate(10,5,subtract);
calculate(10,5,multiply);
//2
const tools = ["React", "Node.js", "Express", "MongoDB"];
tools.forEach(  function(tool,index){
    console.log(`TOOL#${index+1} :${tool}`);
})
//3
const prices = [100, 250, 40, 1200];
const newArray= prices.map(function(price){
 return "$"+price;
}
)
console.log(prices);
console.log(newArray);
//4
const scores = [45, 82, 33, 90, 60, 28, 75];
const newArray1= scores.filter(
    function(score){
        if(score>=50){
            return score;}
    }
)
console.log(scores);
console.log(newArray1);
//5
const words = ["JavaScript", "", "Developer", "Code", "", "Fun"]; 
const newArray2= words.filter(
    function(word){
        if(!(word=="")){
            return word;}
    }
)
console.log(words);
console.log(newArray2);

//6
const expenses = [500, 1200, 300, 450, 150];
 const sum= expenses.reduce( function(acc,expenses){
    return acc+expenses;
},0);
console.log(sum);
//7

const wordsArray = ["Learning", "JavaScript", "is", "really", 
"fun"]; 
const sentence= wordsArray.reduce( function( result,word){
    return result+ " "+ word;});
    console.log(sentence);
let arr=["1","2","3"];
let arr2= arr.map( function(arr){
    return parseInt(arr);
});
console.log(arr2);

let obj={
    name:"khushi",
    age:20
}
console.log(obj.age);
obj.age=25;
console.log("updated",obj.age);
console.log(NaN==NaN);


//local storage
let obj= { name:"khushi",
    age:30
};
let x="";
let str=JSON.stringify(obj);
console.log(str);
localStorage.setItem("str",str);
let get=JSON.parse(localStorage.getItem("str"));
get.name="priya";
//get=JSON.stringify(get);
console.log(get);
localStorage.setItem("str", JSON.stringify(get));
//to remove item
localStorage.removeItem("key name");
let obj= { name:"khushi",
    age:30
};
let x="";
let str=JSON.stringify(obj);
console.log(str);
sessionStorage.setItem("str",str);
let get=JSON.parse(sessionStorage.getItem("str"));
get.name="priya";
//get=JSON.stringify(get);
console.log(get);
sessionStorage.setItem("str", JSON.stringify(get));
let arr=[1,2,3,4];
console.log(arr);
arr.length=0;
console.log(arr);
const btn = document.getElementById("btn");

btn.addEventListener("mousemove", function() {
    console.log("Button clicked!");
});*/




//assignment 3
//  let product=new  DOMParser();
// 
console.log("Hello, World!");
function outer(){
    let count=0;
    return  function inner(){
        console.log(count);
        count++;
    };
};
let khushi=outer();
khushi();
khushi();