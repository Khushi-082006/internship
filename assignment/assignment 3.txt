//1
function taskOne() { 
console.log("Task One Start"); 
taskTwo(); 
console.log("Task One End"); 
} 
function taskTwo() { 
console.log("Inside Task Two"); 
} 
console.log("Global Start"); 
taskOne(); 
console.log("Global End");

/*output => Global start =>task one start => inside task two =>task one end => global end
call stack => task two()
              task one()
              Gec    */

  //2
   console.log(username);   
var username = "Aakash"; 
sayHello(); 
function sayHello() { 
console.log("Hello, Developer!"); 
} 
console.log(score); 
let score = 100;

/* console.log(username);  => it will show undefined because var  are hoisted to the top of there scope during creation phase
                           but only the declaration is hoisted not the assignment so username exist but not the value so undefined
   say hello() => it will print hello developer since functionsdeclarations are fully hoisted so when we call say hello it is alerady present in gec so it prints
      console.log(score); => it will throw reference error cause let are hoistedbut remain unintiliazed till code reach thei declaration
      this period between the start of the scope till actual declaration is called TDZ
      */                    
let appName = "DevWorkspace"; 
function initializeApp(version) { 
let status = "Running v" + version; 
return status; 
} 
let currentStatus = initializeApp(2); 
console.log(currentStatus);
/*
task 1=>GEC is created as soon as js engine start running the script    
    during creation phase of app name ,appname gets created but not initilaised since it is let 
so till it reach its declaration it remains in TDZ 
similarly with current status it is declared but not initilaised till it reaches its declaration


task2=> FEC for initilaize app is created when the function gets invoked basically when 
current status gets assigned  version and status will take memory 
version is a parameter that would be initilaised with 2
whereas local variable status will be hoisted but not initilaised
arguments are stored */
greetUser(); 
var greetUser = function() { 
console.log("Welcome back, Aakash!"); 
};
/* it will return type error 
function declaration and function expression behave differently because when we declare a function it body + name both is hoisted during creation phase 
but when we do function expression only greetuser get hoisted not the initilaisation 
so it show undefined 

during GEC phase greatuser is stored as variable initilaised with undefined */