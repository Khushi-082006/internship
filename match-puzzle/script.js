let arr = ["😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠", "😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠"];
let mainFrame = document.getElementById("mainframe");
let moveSpan = document.getElementById("moveSpan");
let timeSpan = document.getElementById("timeSpan");
let bottom = document.getElementById("bottom");
let restart = document.getElementById("restart");
let resultTime = document.getElementById("resultTime");
let resultMoves = document.getElementById("resultmoves");
let hour = 0;
let sec = 0;
let min = 0;
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = arr[i];
    }
    return arr;
}
shuffle(arr);
showFunction();
console.log(arr);
function flip() {
    for (let i = 1; i < 17; i++) {
        let button = document.getElementById(`box${i}`);
        if (button) {
            button.innerHTML = arr[i - 1];
        }
        button.style.visibility = "hidden";
    }
}
flip();
let firstCard = null;
let secondCard = null;
let boardLocked = false;
let timer = null;
let firstclick = false;
let totalGameCount = 1;
let bestTime = time;
let LowestMoves = move;
let win = 0;


mainFrame.addEventListener("click", function (event) {
    if (event.target.closest(".restart")) {
        move = 0;
        sec = 0;
        min = 0;
        hour = 0;
        firstclick = false;
        boardLocked = false;
        firstCard = null;
        secondCard = null;
        clearInterval(timer);
        timer = null;
        result.style.display = "none";
        let game = document.getElementById("game");
        game.style.display = "block";
        moveSpan.innerText = 0;
        timeSpan = showFunction();
        flip();
        updateTimer();
        totalGameCount++;
        LowestMoves = LowestMoves > move ? move : LowestMoves;
        bestTime = bestTime > time ? time : bestTime;
        return;
    }

    firstclick = true;
    if (firstclick) {
        if (timer == null) { updateTimer(); };
    } let clicked = event.target.closest("button");
    console.log(clicked);

    let childElement = clicked.querySelector("div");
    //  console.log("child",childElement);   
    if (boardLocked) return;
    if (childElement.classList.contains("match")) return;
    if (firstCard === null) {
        childElement.style.visibility = "visible";
        //    console.log(childElement);      
        firstCard = childElement;
        //    console.log("g",firstCard);
    }
    else if (secondCard === null) {
        childElement.style.visibility = "visible";
        secondCard = childElement;
        let move = Number(moveSpan.textContent);
        move++;
        moveSpan.innerText = move;

        boardLocked = true;
        if (firstCard.innerText === secondCard.innerText) {
            firstCard.classList.add("match");
            secondCard.classList.add("match");
            resetTurn();
        } else {
            setTimeout(() => {
                firstCard.style.visibility = "hidden";
                secondCard.style.visibility = "hidden";
                resetTurn();
            }, 1000);
        }
    }
});


function showFunction() {
    timeSpan.innerText =
        `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
function updateTimer() {
    timer = setInterval(function () {
        if (min > 59) {
            hour++;
            min = 0;
        }
        else if (sec > 59) {
            min++;
            sec = 0;
        }
        else { sec++; }
        showFunction();
    }, 1000)
    console.log("timer", timer);
}


function resetTurn() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
    let c = bottom.children;
    let match = document.querySelectorAll(".match").length;
    console.log(match);
    if (match === 16) {
        let time = timeSpan.innerText;
        clearInterval(timer);
        let game = document.getElementById("game");
        game.style.display = "none";
        result.style.display = "block";
        resultMoves.innerText = moveSpan.innerText;
        resultTime.innerText = time;
        win++;


    }
}
let rating;
function scoreChecker(move, min, hour, sec) {
    min = min + (hour * 60);
    sec = sec + (min * 60);
    score = 10000 - sec / move;
    if (score < 2000) {
        rating = "5 star";
    }
    else if (score < 4000) { rating = "4 star"; }
    else if (score < 6000) { rating = "3 star"; }
    else if (score < 8000) { rating = "2 star"; }
    else {
        rating = "4 star";
    }
    document.getElementById("score").innerText = score;
    document.getElementById("rating").innerText = rating;

}
let data = getTaskFromLocalStorage();

function saveDataInLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
function getTaskFromLocalStorage() {
  let tasksData = localStorage.getItem("data");
  if (!tasksData||tasksData === "undefined") {
    return [];
  }
  try {
    let parsedData = JSON.parse(tasksData);
    if (!Array.isArray(parsedData)) {
      return [];
    }
    return parsedData;
  } catch (error) {
    localStorage.removeItem("data");
    return [];
  }
}

/*task=[{
totalgames:totalGames,
 bestTime:bestTime,
 lowestMoves:lowestMoves,win:Win}]
 data.push(task);*/
