let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let mgsContainer = document.querySelector(".mgs-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#start-game");
let player1Name = '';
let player2Name = '';
let turnO = true; // Player 1 starts

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Colors to cycle through for each box
const colors = ["blanchedalmond", "lightblue", "lightgreen", "lightcoral", "lightpink", "lightgoldenrodyellow"];

// Start the game after getting player names
startGameBtn.addEventListener("click", () => {
    player1Name = document.querySelector("#player1").value || "Player 1";
    player2Name = document.querySelector("#player2").value || "Player 2";
    resetGame();
});

// Reset game state
const resetGame = () => {
    turnO = true;
    enableBoxes();
    mgsContainer.classList.add("hide");
};

// Checking for each Box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "S";
            box.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            turnO = false;
        } else {
            box.innerText = "O";
            box.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        Draw();
    });
});

// Disable boxes after winning
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable boxes for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "blanchedalmond"; // Reset to original color
    }
};

// Show winner on page
const showWinner = (winner) => {
    let winnerName = winner === "S" ? player1Name : player2Name;
    msg.innerText = `Congratulations, the winner is ${winnerName}!`;
    mgsContainer.classList.remove("hide");
    disableBoxes();
};

// Show draw if the game is tied
const Draw = () => {
    let allBoxesFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }
    if (allBoxesFilled && !checkWinner()) {
        msg.innerText = `Oops! The match is a tie.`;
        mgsContainer.classList.remove("hide");
        disableBoxes();
    }
};

// Checking for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
