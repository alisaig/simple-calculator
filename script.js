// operations
let num1 = "";
let num2 = "";
let operator = "";
let clear = true;

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
        case "add":
            return add(num1, num2);
        case "subtract":
            return subtract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

buttons.addEventListener("click", (event) => {
    const buttonClass = event.target.className;
    let buttonID = event.target.id;
    console.log(buttonID, buttonClass);

    switch(buttonClass) {
        case "num":
            buttonID = buttonID[1];
            if (clear) {
                num1 = num1 + buttonID;
                screen.textContent = num1;
            } else {
                num2 = num2 + buttonID;
                screen.textContent = num2;
            };
            break;
        case "operator":
            operator = buttonID;
            switch:
            break;
        case "clear":
            break;
        case "back":
            break;
        default:
            screen.textContent = "ERROR";
            break;
    }
});