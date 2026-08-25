 const container = document.getElementById("container");
        const upper = document.getElementById("upper");
        const lower = document.getElementById("lower");
        const session = document.getElementById("session");
        const times = document.getElementById("times");
        const sessionTime = document.getElementById("session-time");
        const breakTime = document.getElementById("break-time"); 
        const sessionText = document.getElementById("session-time1");
        const breakText = document.getElementById("break-time1");
        const sessionSpan = document.getElementById("session-span");
        const start = document.getElementById("start");
        const plusSessionBtn = document.getElementById("plus-session");
        const minusSessionBtn = document.getElementById("minus-session");
        const plusBreakBtn = document.getElementById("plus-break");
        const minusBreakBtn = document.getElementById("minus-break");
        const modeText = document.getElementById("mode-text");


        // variable

        let min = 25;
        let sec = 0;
        let timer = null;
        let mode = "session";

        // function

        function settimer() {
            timer = setInterval(function () {
                if (sec > 0)
                 { sec--; }
                else if (min > 0)
                 {
                    min--;
                    sec = 59;
                }
                else {
                    clearInterval(timer);
                    timer = null;
                    if (mode === "session") {

                        let breakMinutes = Number(breakText.innerText);
                        min = breakMinutes;
                        sec = 0;
                        mode = "break";
                        modeText.innerText = "Break";

                        settimer();

                    }
                    else {

                        let sessionMinutes = Number(sessionText.innerText);
                        mode = "session";
                        min = sessionMinutes;
                        sec = 0;
                        modeText.innerText = "Session"
                        let sessionNumber = Number(sessionSpan.innerText);
                        sessionNumber++;
                        sessionSpan.innerText = sessionNumber;
                        settimer();

                    }
                } showFunction();
            }, 1000
            )
        }

        function showFunction() {
            upper.innerText = `
             ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

        };
        showFunction();
        //event listener
        container.addEventListener("click", function (event) {
            if (event.target.matches("#plus-session")) {
                let value = Number(sessionText.innerText);
                value++;
                sessionText.innerText = value;
                min = value;
                console.log(min);
                showFunction();
            }
            if (event.target.matches("#minus-session")) {
                let value = Number(sessionText.innerText);
                if (value > 0) {
                    value--;
                }
                sessionText.innerText = value;
                min = value;
                showFunction();
            }
            if (event.target.matches("#plus-break")) {
                let value2 = Number(breakText.innerText);
                value2++;
                breakText.innerText = value2;
            }
            if (event.target.matches("#minus-break")) {
                let value2 = Number(breakText.innerText);
                if (value2 > 0) {
                    value2--;
                }
               breakText.innerText = value2;
            }
            if (event.target.matches("#reset")) {
                clearInterval(timer);
                timer = null;
                mode = "session";
                sessionSpan.innerText = 0;
                modeText.innerText = "Session";
                

                breakText.innerText = 5;
                sessionText.innerText = 25;
                start.innerText = "Start";
                min = 25;
                sec = 0;
                plusBreakBtn.disabled = false;
                minusBreakBtn.disabled = false;
                plusSessionBtn.disabled = false;
                minusSessionBtn.disabled = false;
                showFunction();
            }
            if (event.target.matches("#start")) {
                if (start.innerText === "Pause") {
                    // plusBreakBtn.disabled=true;
                    start.innerText = "Start";
                    plusBreakBtn.disabled = false;
                    minusBreakBtn.disabled = false;
                    plusSessionBtn.disabled = false;
                    minusSessionBtn.disabled = false;
                    clearInterval(timer);
                    timer = null;
                }
                else {
                    start.innerText = "Pause";
                    plusBreakBtn.disabled = true;
                    minusBreakBtn.disabled = true;
                    plusSessionBtn.disabled = true;
                    minusSessionBtn.disabled = true;
                    settimer();
                }
            }
        })