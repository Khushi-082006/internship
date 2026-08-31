const dropdown = document.getElementById("dropdown");
const code = document.getElementById("code");
const lineNumber = document.getElementById("lineNumber");
const result=document.getElementById("result");
const run=document.getElementById("run");

const template = {
    7: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
    77: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`,
    8: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
     4: `console.log("Hello, World!");`,
     0: `print("Hello, World!")`
};
code.value = template[7];
dropdown.addEventListener("change", function () {
    code.value = template[dropdown.value];
});

function updateLineNumber(){
    const no = code.value.split("\n").length;
    let num="";
    for(let i=1;i<=no;i++){
        num+=i+"<br>";
    }
    lineNumber.innerHTML = num;
}
code.addEventListener("input", updateLineNumber);
code.addEventListener("scroll", function () {
    lineNumber.scrollTop = code.scrollTop;
});
updateLineNumber();
console.log(code.value);

function sendRequest(){
const url=`https://course.codequotient.com/api/executeCode`;
fetch(url,{
    method:"POST",
    headers:{
    "content-type":"application/JSON"
    },
    body:JSON.stringify({
        "code":code.value,
        "langId":dropdown.value

    })
})
.then((response) =>{
    if(!response.ok){
        throw new Error("Code is null");        
    }
    return response.json();
})
.then((data)=>{
     if(data.error){
        throw new Error(data.error);        
    }
    const codeId =data.codeId;
    getResult(codeId);
})
.catch((error)=>{
    result.textContent=error.message;
})

function getResult(codeId){
 const resultUrl= m;
 const interval =setInterval( function(){ 
fetch(resultUrl)
.then((response)=>{
    if(!response.ok){
        throw new Error("error");
    }
    return response.json();
})
.then((data)=>{
     if(Object.keys(data.data).length ===0){
        result.textContent="compiling";
        return;
     }

    if(data.data.errors){
        clearInterval(interval);
      result.textContent=data.data.errors;
    }
    else{
        clearInterval(interval);
        result.textContent=data.data.output;
    }
 
})
.catch((error)=>{
    clearInterval(interval);
    result.textContent=error.message;
})},1000)

 }}
run.addEventListener("click",sendRequest);