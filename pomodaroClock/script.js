const container = document.getElementById("container");
const upper = document.getElementById("upper");

const sessionText = document.getElementById("session-time1");
const breakText = document.getElementById("break-time1");
const sessionSpan = document.getElementById("session-span");

const start = document.getElementById("start");

const plusSessionBtn = document.getElementById("plus-session");
const minusSessionBtn = document.getElementById("minus-session");
const plusBreakBtn = document.getElementById("plus-break");
const minusBreakBtn = document.getElementById("minus-break");

const modeText = document.getElementById("mode-text");


// timer state

let min = 25;
let sec = 0;
let timer = null;
let mode = "session";
let hour = 0;

// display functions
function showFunction() {
    upper.innerText =
        `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

function updateTimer(value){
     if (value >= 60) {
                hour = Math.floor(value / 60);
                min = value % 60;

            } else {
                hour = 0;
                min = value;
            }
            sec = 0;
           showFunction();
}

// timer functions

function stopTimer() {
clearInterval(timer);
timer = null;
}
function startTimer() {
if (timer !== null) {
return;
}
timer = setInterval(function () {
    if (sec > 0) {
        sec--;
    }
    else if (min > 0) {
        min--;
        sec = 59;
    }
    else if (hour > 0) {
        hour--;
        min = 59;
        sec = 59;
    }
    else {
        stopTimer();
        switchMode();
        startTimer();
        return;
    }

    showFunction();

}, 1000);

}
function switchMode() {
    start.innerText = "Pause";
if (mode === "session") {
mode = "break";
modeText.innerText = "Break";

    updateTimer(Number(breakText.innerText));
}
else {
    mode = "session";
    modeText.innerText = "Session";

    updateTimer(Number(sessionText.innerText));

    let sessionNumber = Number(sessionSpan.innerText);
    sessionNumber++;

    sessionSpan.innerText = sessionNumber;
}

}
// Button state

function disableTimeButtons() {
plusBreakBtn.disabled = true;
minusBreakBtn.disabled = true;
plusSessionBtn.disabled = true;
minusSessionBtn.disabled = true;
}

function enableTimeButtons() {
plusBreakBtn.disabled = false;
minusBreakBtn.disabled = false;
plusSessionBtn.disabled = false;
minusSessionBtn.disabled = false;
}
// Reset

function resetTimer() {
stopTimer();

mode = "session";
min = 25;
sec = 0;
hour = 0;

sessionSpan.innerText = 0;
modeText.innerText = "Session";

sessionText.innerText = 25;
breakText.innerText = 5;

start.innerText = "Start";

enableTimeButtons();
showFunction();

}
// event listner
container.addEventListener("click", function (event) {

if (event.target.matches("#plus-session")) {
    let value = Number(sessionText.innerText);

    value++;
    sessionText.innerText = value;

    if (mode === "session") {
        updateTimer(value);
    }
}

else if (event.target.matches("#minus-session")) {
    let value = Number(sessionText.innerText);

    if (value > 0) {
        value--;
        sessionText.innerText = value;

        if (mode === "session") {
            updateTimer(value);
        }
    }
}

else if (event.target.matches("#plus-break")) {
    let value = Number(breakText.innerText);

    value++;
    breakText.innerText = value;

    if (mode === "break") {
        updateTimer(value);
    }
}

else if (event.target.matches("#minus-break")) {
    let value = Number(breakText.innerText);

    if (value > 0) {
        value--;
        breakText.innerText = value;

        if (mode === "break") {
            updateTimer(value);
        }
    }
}

else if (event.target.matches("#start")) {

    if (timer !== null) {
        stopTimer();

        start.innerText = "Start";
        enableTimeButtons();
    }
    else {
        startTimer();

        start.innerText = "Pause";
        disableTimeButtons();
    }
}

else if (event.target.matches("#reset")) {
    resetTimer();
}

});

// Initial display

showFunction();



