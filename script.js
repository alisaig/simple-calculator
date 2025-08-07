// Global variables
let num1 = "";
let num2 = "";
let operator = "";
// Boolean variable signifying that it's the first operation either:
// 1. when opening the page
// 2. after clicking the clear button
let clear = true;
// Variable mostly relevant for the edge cases where buttons aren't clicked in the expected order
// e.g. clicking number -> operation -> equals -> equals -> number
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
    if (b === 0) {
        // Attempting to divide by 0 is treated the same as pressing clear
        clear = true;
        return "ERROR. DON'T DIVIDE BY 0!";
    };
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
            // Very unlikely for default to execute, but procedure exists just in case
            clear = true;
            return "ERROR";
    }
}

// Function to clear all variables to avoid repetition
function clearAll() {
    clear = true;
    num1 = "";
    num2 = "";
    operator = "";
}

// Handle the display of numbers after an operation is performed
// Limits numbers shown to 12 characters, negative sign not included
function screenDisplay(dig) {
    let digStr = dig.toString()
    const digStrLen = digStr.length;

    if (digStrLen > 12) {
        const decimalIndx = digStr.indexOf(".");
        // Handle numbers that are too long because they're too large
        // No need to check for numbers that are very close to 0 as JS already converts them to exponential notation automatically
        if (Math.abs(dig) >= 1e12 || (decimalIndx === 11)) {
            // if ((dig/(10**(digStrLen-1))).toString().length > 9) dig = dig.toExponential(7);
            dig = dig.toExponential(6);
            digStr = dig.toString();
            // Get rid of trailing 0s
            digStr = digStr.replace(/\.?0+e/, "e");

        // Handle numbers that have overly long decimals
        } else {
            dig = dig.toFixed(12-decimalIndx-1);
            digStr = dig.toString();
            // Get rid of trailing 0s
            digStr = digStr.replace(/\.?0+$/, "");
        }
    }
    return digStr;
}

// Event listener for any of the buttons clicked within the #buttons container
buttons.addEventListener("click", (event) => {
    const buttonClass = event.target.className;
    // ID only relevant for the digit("num") and operator buttons as there are multiple of them
    let buttonID = event.target.id;

    // What button was clicked determined by checking its class
    switch(buttonClass) {
        case "num":
            // Get rid of the "n" in buttonID
            buttonID = buttonID.slice(1);
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
            // Default operation execution where there 3 key global variables are all not empty
            if (!(num2 === "") && (lastClickClass != "equals")) {
                num1 = operate(num1, num2, operator);
                num2 = "";
                operator = "";
                screen.textContent = screenDisplay(num1);
            };
            // Handle situation where user wants the first number entered at the beginning/after a clear to be negative
            if (buttonID === "subtract" && num1 === "") {
                num1 = "-";
                screen.textContent = num1;
                break;
            };
            // Handle situation where user wants second number to be negative (but not to use the subtraction operator)
            if (buttonID === "subtract" && operator !== "" && operator !== "subtract" && num2 === "") {
                num2 = "-";
                screen.textContent = num2;
                break;
            };
            // Handle situation when multiple operator buttons are pressed immediately in succession
            // Only the first operator pressed is registered
            if (operator === "" || lastClickClass === "equals") {
                operator = buttonID;
                num2 = "";
                clear = false;
            };
            break;
        case "equals":
            // Default operation execution where there 3 key global variables are all not empty
            if (!(num2 === "")) {
                num1 = operate(num1, num2, operator);
                screen.textContent = screenDisplay(num1);
            // Takes care of situation when equals sign is clicked right after an operator button and before another number button so num2 is empty
            // Operation just happens between two num1s instead
            } else {
                num2 = num1;
                num1 = operate(num1, num1, operator);
                screen.textContent = screenDisplay(num1);
            }
            break;
        case "point":
            // Add decimal point to number entered, but allow only one max
            if (clear && !num1.includes(".")) {
                num1 = num1 === ""? "0." : num1 + ".";
                screen.textContent = num1;
            };
            if (!clear && !num2.includes(".")) {
                num2 = num2 === ""? "0." : num2 + ".";
                screen.textContent = num2;
            };
            break;
        case "clear":
            clearAll();
            screen.textContent = "";
            break;
        case "back":
            // Backspace/clear the last character entered
            if (clear) {
                num1 = num1.slice(0,-1);
                screen.textContent = num1;
            }
            else {
                num2 = num2.slice(0,-1);
                screen.textContent = num2;
            };
            break;
        default:
            break;
    }

    lastClickClass = buttonClass;
});

// Keyboard support that works by simulating a click on certain buttons when pressing certain keys
// e.g. pressing the "=" or "Enter" key simulates pressing the clear button on the calculator
document.addEventListener("keydown", (event) => {
    // Record which key was pressed
    const keyDown = event.key.toLowerCase();

    switch (keyDown) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            document.querySelector(`#n${keyDown}`).click();
            break;
        case "/":
            document.querySelector("#divide").click();
            break;
        case "*":
            document.querySelector("#multiply").click();
            break;
        case "-":
            document.querySelector("#subtract").click();
            break;
        case "+":
            document.querySelector("#add").click();
            break;
        case ".":
            document.querySelector(".point").click();
            break;
        case "=":
        case "enter":
            document.querySelector(".equals").click();
            break;
        case "escape":
        case "c":
            document.querySelector(".clear").click();
            break;
        case "backspace":
        case "b":
            document.querySelector(".back").click();
            break;
        default:
            break;
    };  
});