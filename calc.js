
            let equation = document.getElementById("equation");
            let operator = document.querySelectorAll(".operator");
            let number = document.querySelectorAll(".number");
            let backspace = document.getElementById("backspace");
            let result = document.getElementById("result");
            number.forEach((num) => {
                num.addEventListener("click", () => {
                    equation.innerText += num.innerText;
                    result.innerText=eval(equation.innerText);
                })
            })

            operator.forEach((op) => {
                op.addEventListener("click", () => {
                    let lastChar = equation.innerText.slice(-1);
                    if (!["+", "-", "*", "/", "%", "."].includes(lastChar)) {
                        equation.innerText+=op.innerText;
                                            }
                    

                })
            })
            function clearEquation() {
                equation.innerText = "";
                result.innerText = "";

            }

            backspace.addEventListener("click", () => {
                equation.innerText=equation.innerText.slice(0, -1);
                result.innerText=eval(equation.innerText);
            });

            equal.addEventListener("click", () => {
                if (equation.innerText) {
                    result.innerText=eval(equation.innerText);
                    equation.innerText= "";
                }

            });


       