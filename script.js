// Global variables
let num1 = "";
let num2 = "";
let operator = "";
// Boolean variable signifying that it's the first operation either:
// 1. when opening the page
// 2. after clicking the clear button
let clear = true;
let lastClickClass = "";

// Select relevant DOM elements
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
    // Variable values only converted to numbers at this point as before they're strings to correctly show on the screen
    a = Number(a);
    b = Number(b);
    
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

function clearAll() {
    clear = true;
    num1 = "";
    num2 = "";
    operator = "";
}

// Event listener for any of the buttons clicked within the #buttons container
buttons.addEventListener("click", (event) => {
    const buttonClass = event.target.className;
    // ID only relevant for the digit("num") and operator buttons as there are multiple of them
    let buttonID = event.target.id;

    // What button was clicked determined by checking its class
    switch(buttonClass) {
        case "num":
            buttonID = buttonID[1];
            // Value for num1 only directly set by button either:
            // 1. when opening the page
            // 2. after clicking the clear button
            if (lastClickClass === "equals") clearAll();
            if (clear) {
                num1 = num1 + buttonID;
                screen.textContent = num1;
            } else {
                num2 = num2 + buttonID;
                screen.textContent = num2;
            };
            break;
        case "operator":
            if (!(num2 === "") && (lastClickClass != "equals")) {
                num1 = operate(num1, num2, operator);
                num2 = "";
                operator = "";
                screen.textContent = num1;
            }
            // Takes care of situation when multiple operator buttons are pressed immediately in succession
            // Only the first operator pressed is registered
            if (operator === "" || lastClickClass === "equals") {
                operator = buttonID;
                clear = false;
            };
            break;
        case "equals":
            if (!(num2 === "")) {
                num1 = operate(num1, num2, operator);
                // num2 = "";
                // operator = "";
                screen.textContent = num1;
            // Takes care of situation when equals sign is clicked right after an operator button and before another number button so num2 is empty
            // Operation just happens between two num1s instead
            } else {
                num2 = num1;
                num1 = operate(num1, num1, operator);
                screen.textContent = num1;
            }
            break;
        case "clear":
            clearAll();
            screen.textContent = "";
            break;
        case "back":
            break;
        default:
            break;
    }

    lastClickClass = buttonClass;
});