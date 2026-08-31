let arr = ["😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠", "😍", "😡", "😈", "🥶", "😺", "🫥", "😶‍🌫️", "🫠"];

let mainFrame = document.getElementById("mainframe");
let moveSpan = document.getElementById("moveSpan");
let timeSpan = document.getElementById("timeSpan");
let bottom = document.getElementById("bottom");
let restart = document.getElementById("restart");
let resultTime = document.getElementById("resultTime");
let resultMoves = document.getElementById("resultmoves");
let result = document.getElementById("result");
let game = document.getElementById("game");
let history = document.getElementById("history");
let hour = 0;
let sec = 0;
let min = 0;
let move = 0;
let firstCard = null;
let secondCard = null;
let boardLocked = false;
let timer = null;
// let firstclick = false;
let totalGameCount = 0;
let bestTime = Infinity;
let LowestMoves = Infinity;
let win = 0;
let rating;
let score = 0;
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function showFunction() {
    timeSpan.innerText =
        `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
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
function reset() {
    move = 0;
    sec = 0;
    min = 0;
    hour = 0;
    // firstclick = false;
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
function resetTurn() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
    let match = document.querySelectorAll(".match").length;
    // console.log(match);
    if (match === 16) {
        let time = timeSpan.innerText;
        clearInterval(timer);
        timer = null;
        game.style.display = "none";
        result.style.display = "block";
        resultMoves.innerText = move;
        resultTime.innerText = time;

        totalGameCount++;
        win++;
        let totalSec = (hour * 3600) + (min * 60) + sec;
        if (totalSec < bestTime) {
            bestTime = totalSec;
        }
        if (move < LowestMoves) {
            LowestMoves = move;
        }
        scoreChecker(move, min, hour, sec);
        let gameData = getTaskFromLocalStorage();
        if (!gameData) {
            gameData = {
                totalgames: totalGameCount,
                bestTime: bestTime,
                lowestMoves: LowestMoves, win: win, history: []
            };
        }
        if (!gameData.history) { gameData.history = []; }
        gameData.totalgames = totalGameCount;
        gameData.bestTime = bestTime;
        gameData.lowestMoves = LowestMoves;
        gameData.win = win;
        let historyGame = {
            date: new Date().toLocaleString(),
            time: time,
            moves: move,
            score: Math.round(score)
        };

        gameData.history.push(historyGame);
        saveDataInLocalStorage(gameData);
        showHistory();
    }

}
function showHistory() {
    let data2 = getTaskFromLocalStorage();
    if (!data2) {
        history.innerText = "No game history";
        return;
    }
    history.innerHTML = `
        <h2>Game History</h2>
        <p>Total Games:${data2.totalgames}</p>
        <p>Wins:${data2.win}</p>
        <p>Best Time(in sec):${data2.bestTime}</p>
        <p>Lowest Moves:${data2.lowestMoves}</p>
        <hr>
        <h3>Games</h3>       
    `;
    data2.history.forEach(function (game, index) {

        history.innerHTML += `
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
function scoreChecker(move, min, hour, sec) {
    let totalSec = (hour * 3600) + (min * 60) + sec;
    score = 10000 - (totalSec / move);
    if (score >= 8000) {
        rating = "5 star";
    }
    else if (score >= 6000) { rating = "4 star"; }
    else if (score >= 4000) { rating = "3 star"; }
    else if (score >= 2000) { rating = "2 star"; }
    else {
        rating = "1 star";
    }
    document.getElementById("score").innerText = Math.round(score);
    document.getElementById("rating").innerText = rating;

}

mainFrame.addEventListener("click", function (event) {
    if (event.target.closest(".restart")) {
        // move = 0;
        // sec = 0;
        // min = 0;
        // hour = 0;
        // // firstclick = false;
        // boardLocked = false;
        // firstCard = null;
        // secondCard = null;
        // clearInterval(timer);
        // timer = null;
        result.style.display = "none";
        game.style.display = "block";
        reset();
        // moveSpan.innerText = 0;
        // timeSpan = showFunction();
        // flip();
        // updateTimer();
        // totalGameCount++;
        // LowestMoves = LowestMoves > move ? move : LowestMoves;
        // bestTime = bestTime > time ? time : bestTime;
        return;
    }

    // firstclick = true;
    // if (firstclick) {
    //     if (timer == null) { updateTimer(); };}
    let clicked = event.target.closest(".buttons");
    if (!clicked) {
        return;
    }
    // console.log(clicked);
    if (boardLocked) return;

    let childElement = clicked.querySelector("div");
    if (!childElement) {
        return;
    }
    //  console.log("child",childElement);   
    // if (boardLocked) return;
    if (childElement.classList.contains("match")) return;
    if (childElement === firstCard) {
        return;
    }
    updateTimer();
    if (firstCard === null) {
        childElement.style.visibility = "visible";
        //    console.log(childElement);      
        firstCard = childElement;
        return;
        //    console.log("g",firstCard);
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
let data2 = getTaskFromLocalStorage();
if (data2) {
    totalGameCount = data2.totalgames || 0;
    bestTime = data2.bestTime || Infinity;
    LowestMoves = data2.lowestMoves || Infinity;
    win = data2.win || 0;
}
shuffle(arr);
showFunction();
console.log(arr);

flip();
showHistory();
/*task=[{
totalgames:totalGames,
 bestTime:bestTime,
 lowestMoves:lowestMoves,win:Win}]
 data.push(task);*/
