let arr = ["😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠", "😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠"];

let mainFrame = document.getElementById("mainframe");
let moveSpan = document.getElementById("moveSpan");
let timeSpan = document.getElementById("timeSpan");
let bottom = document.getElementById("bottom");
let resultTime = document.getElementById("resultTime");
let resultMoves = document.getElementById("resultmoves");
let result = document.getElementById("result");
let game = document.getElementById("game");
let history = document.getElementById("history");
let scoreElement = document.getElementById("score");
let ratingElement= document.getElementById("rating");


let hour = 0;
let sec = 0;
let min = 0;

let move = 0;

let firstCard = null;
let secondCard = null;

let boardLocked = false;
let timer = null;

let rating;
let score = 0;

// load old data
let gameData = getTaskFromLocalStorage();
if (!gameData) {
    gameData = {
        totalgames: 0,
        bestTime: Infinity,
        lowestMoves: Infinity,
        win: 0,
        history: []
    };
}
if (!gameData.history) {
    gameData.history = [];
}

// shuffle

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// timer
function showFunction() {
    timeSpan.innerText =
        `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
function updateTimer() {
    if (timer !== null) {
        return;
    }
    timer = setInterval(function () {
        if (sec >= 59) {
            min++;
            sec = 0;
        }
        else { sec++; }
        if (min >= 60) {
            hour++;
            min = 0;
        }
        showFunction();
    }, 1000)
    console.log("timer", timer);
}

// board
function flip() {
    for (let i = 1; i < 17; i++) {
        let button = document.getElementById(`box${i}`);
        if (button) {
            button.innerHTML = arr[i - 1];
            button.style.visibility = "hidden";
            button.classList.remove("match");
        }
    }
}

// reset
function reset() {
    move = 0;
    sec = 0;
    min = 0;
    hour = 0;
    
    boardLocked = false;
    firstCard = null;
    secondCard = null;
    clearInterval(timer);
    timer = null;
    moveSpan.innerText = 0;
    showFunction();
    shuffle(arr);
    flip();

}

// reset turn

function resetTurn() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;

    let match = document.querySelectorAll(".match").length;
    if (match !== 16) {
        return;
    }
    gameWon();
}
function gameWon(){
  
        let time = timeSpan.innerText;

        clearInterval(timer);
        timer = null;
        
        game.style.display = "none";
        result.style.display = "flex";
        
        resultMoves.innerText = move;
        resultTime.innerText = time;

        gameData.totalgames++;
        gameData.win++;

        
        let totalSec = (hour * 3600) + (min * 60) + sec;
        if (totalSec <  gameData.bestTime) {
            gameData.bestTime = totalSec;
        }
        if (move < gameData.lowestMoves) {
            gameData.lowestMoves = move;
        }
        scoreChecker(move,totalSec);
    saveGame(time);
showHistory();
}
function scoreChecker(move, totalSec) {
   
    score = 10000 - (totalSec / move);
    if (score >= 8000) {
        rating = "⭐ ⭐ ⭐ ⭐ ⭐";
    }
    else if (score >= 6000) { rating = "⭐ ⭐ ⭐ ⭐"; }
    else if (score >= 4000) { rating = "⭐ ⭐ ⭐"; }
    else if (score >= 2000) { rating = "⭐ ⭐"; }
    else {
        rating = "⭐";
    }
   scoreElement.innerText = Math.round(score);
    ratingElement.innerText = rating;

}
// save game
 function saveGame(time){
        
            let historyGame = {
            date: new Date().toLocaleString(),
            time: time,
            moves: move,
            score: Math.round(score)
        };
        gameData.history.push(historyGame);
        saveDataInLocalStorage(gameData);
        
}
// history
function showHistory() {
    
    if (!gameData) {
        history.innerText = "No game history";
        return;
    }
    history.innerHTML = `
        <h2>Game History</h2>
        <p>Total Games:${gameData.totalgames}</p>
        <p>Wins:${gameData.win}</p>
        <p>Best Time(in sec):${gameData.bestTime}</p>
        <p>Lowest Moves:${gameData.lowestMoves}</p>
        <hr>
        <h3>Games</h3> 
        <div id="historyGames"></div>      
    `;
    gameData.history.forEach(function (game, index) {

       document.getElementById("historyGames").innerHTML += `
            <div class="historyGame">
                <h4>Game${index + 1}</h4>
                <p>Date:${game.date}</p>
                <p>Time:${game.time}</p>
                <p>Moves:${game.moves}</p>
                <p>Score:${game.score}</p>
            </div>
            <hr>
        `;
    });
}

// local storage
function saveDataInLocalStorage(data) {
    localStorage.setItem("data2", JSON.stringify(data));
}

function getTaskFromLocalStorage() {
    let tasksData = localStorage.getItem("data2");
    if (!tasksData || tasksData === "undefined") {
        return null;
    }
    try {
        let parsedData = JSON.parse(tasksData);
        return parsedData;
    } catch (error) {
        localStorage.removeItem("data2");
        return null;
    }
}

mainFrame.addEventListener("click", function (event) {
    if (event.target.closest(".restart")) {
        result.style.display = "none";
        game.style.display = "flex";
        reset();
                return;
    }

    let clicked = event.target.closest(".buttons");
    if (!clicked) {
        return;
    }   
    if (boardLocked) return;

    let childElement = clicked.querySelector("div");
    if (!childElement) {
        return;
    }
  
    if (childElement.classList.contains("match")) return;
    if (childElement === firstCard) {
        return;
    }
    updateTimer();
    if (firstCard === null) {
        childElement.style.visibility = "visible";
            
    firstCard = childElement;
        return;
        
    }
    if (secondCard === null) {
        childElement.style.visibility = "visible";
        secondCard = childElement;
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


// start game
shuffle(arr);
showFunction();
console.log(arr);

flip();
showHistory();
