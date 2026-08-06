let equation = document.getElementById("equation");
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let backspace = document.getElementById("backspace");
let result = document.getElementById("result");
console.log("1");

number.forEach((num) => {
    num.addEventListener("click", () => {
        let splitedEquation = equation.innerText.split(/[\+\-\*\/%]/);
        let lastNumber = splitedEquation[splitedEquation.length - 1];
        let digit = num.innerText;
        if ((lastNumber === "0" && digit === "0") || (lastNumber === "00" && digit === "00")) {
            return;
        }
        if ((lastNumber === "0" && digit != "." && digit != "0")) {
            equation.innerText = equation.innerText.slice(0, -1) + digit;
        }
        else if ((lastNumber === "00" && digit != "." && digit != "00")) {
            equation.innerText = equation.innerText.slice(0, -2) + digit;
        }
        else {
            equation.innerText += digit;
        }
        let lastChar = equation.innerText.slice(-1);
        if (!isNaN(lastChar)) {
            result.innerText = eval(equation.innerText);
        } else {
            result.innerText = "";
        }
    })
});

operator.forEach((op) => {
    op.addEventListener("click", () => {
        let lastChar = equation.innerText.slice(-1);
        if (equation.innerText === "" && op.innerText !== "-") {
            return;
        }


        if (lastChar === ".") {
            return;
        }
        if (!["+", "-", "*", "/", "%"].includes(lastChar)) {
            equation.innerText += op.innerText;
        }
        else {
            if (equation.innerText.length === 1 && equation.innerText === "-" && op.innerText !== "-") {
                return;
            }

            equation.innerText = equation.innerText.slice(0, -1) + op.innerText;


        }
    })
});
function clearEquation() {
    equation.innerText = "";
    result.innerText = "";
}

backspace.addEventListener("click", () => {
    if (equation.innerText) {
        equation.innerText = equation.innerText.slice(0, -1);
        let lastChar = equation.innerText.slice(-1);

        if (equation.innerText === "") {
            result.innerText = "";
        }

        else if (!["+", "-", "*", "/", "%"].includes(lastChar)) {
            result.innerText = eval(equation.innerText);
        }
        else {
            let val = equation.innerText.slice(0, -1);
            result.innerText = val ? eval(val) : "";

        }



    }
});

equal.addEventListener("click", () => {
    if (equation.innerText) {
        result.innerText = eval(equation.innerText);
        equation.innerText = "";
    }

});
decimal.addEventListener("click", () => {
    let lastChar = equation.innerText.slice(-1);
    if (equation.innerText === "") {
        equation.innerText = "0.";
        return;
    }
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
        equation.innerText += "0."; return;
    }

    let splitedEquation = equation.innerText.split(/[\+\-\*\/%]/);
    // console.log(splitedEquation);
    let lastNumber = splitedEquation[splitedEquation.length - 1];
    // console.log(lastNumber);
    if (!lastNumber.includes(".")) {
        equation.innerText += ".";
    }

})





