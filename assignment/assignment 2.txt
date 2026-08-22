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

