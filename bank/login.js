const accountNo = document.getElementById("accountNo");
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
    loginME(accountNo.value);
});

function loginME(acNo) {
    console.log(acNo);
    
    if (acNo === "") {
        alert("Please enter your account number.");
        return;
    }
    window.location.href = "bank.html";}