const addAmount= document.getElementById("addAmount-btn");
const withdrawAmount = document.getElementById("withdraw-btn");
const update1 = document.getElementById("update-1");
const update2 = document.getElementById("update-2");
const cancelAdd = document.getElementById("cancel-add");
const cancelWithdraw = document.getElementById("cancel-withdraw");

addAmount.addEventListener("click", () => {
    update2.style.display="none";
    update1.style.display="flex";
})
withdrawAmount.addEventListener("click", () => {
    update1.style.display="none";
    update2.style.display="flex";
})
cancelAdd.addEventListener("click", () => {    
    update1.style.display="none";
})
cancelWithdraw.addEventListener("click", () => {    
    update2.style.display="none";
})


const amount = document.getElementById("amount");
const add1 = document.getElementById("add");
const input1 = document.getElementById("input-no1");
const input2 = document.getElementById("input-no2");
const deduct = document.getElementById("deduct");

add1.addEventListener("click", () => {
    
            amount.innerText= Number(amount.innerText)+Number(input1.value);
            input1.value="";
            update1.style.display="none";

});
deduct.addEventListener("click", () => {
            amount.innerText= Number(amount.innerText)-Number(input2.value);
            input2.value="";
            update2.style.display="none";
});










