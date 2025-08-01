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
function operate(a, b, operator) {
    a = parseInt(a);
    b = parseInt(b);
    
    switch(operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
        default:
            return "ERROR";
    }
}

buttons.addEventListener("click", (event) => {
    const buttonClass = event.target.className;
    let buttonID = event.target.id;

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
            if (!(num2 === "")) {
                num1 = operate(num1, num2, operator);
                num2 = "";
                operator = "";
                screen.textContent = num1;
            }
            if (operator === "") {
                operator = buttonID;
                clear = false;
            };
            break;
        case "equals":
            if (!(num2 === "")) {
                num1 = operate(num1, num2, operator);
                num2 = "";
                operator = "";
                screen.textContent = num1;
            } else {
                num1 = operate(num1, num1, operator);
                operator = "";
                screen.textContent = num1;
            }
            break;
        case "clear":
            clear = true;
            num1 = "";
            num2 = "";
            operator = "";
            screen.textContent = "";
            break;
        case "back":
            break;
        default:
            break;
    }
});