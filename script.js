// operations
let num1 = 0;
let num2 = 0;
let operator = "";

// const nums = document.querySelectorAll(".num");
// const operators = document.querySelectorAll(".operator");
// const clear = document.getElementById("clear");
// const back = document.getElementById("back");
const buttons = document.querySelector("#buttons");
const screen = document.querySelector("#screen");

// Operation functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "ERROR. DON'T DIVIDE BY 0!"
    return a / b;
}

// General operation function that leads to the correct operation function
function operate(num1,num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

buttons.addEventListener("click", (event) => {
    buttonID = event.target.className;
    buttonClass = event.target.id;
    
    switch(button) {
        case
    }
})


nums.addEventListener("click", (event) => {
    key = event.target.id;
    screen.textContent = key;


    function playGame(event) {
    const humanSelection = event.target.id;
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);

    if (humanScore === rounds || computerScore === rounds) {
        buttons.removeEventListener("click", playGame);

        update.textContent = (humanScore === 5) ? "You won!" : "You lost!";
    }
}
})