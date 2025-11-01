let display = document.getElementById('display');
let currentInput = '';
let currentOperation = null;
let previousInput = '';

function appendNumber(number) {
    if (currentInput.includes('.') && number === '.') return; // Prevent multiple decimals
    currentInput += number;
    updateDisplay();
}

function appendOperation(operation) {
    if (currentInput === '' && previousInput === '') return; // Don't start with an operator
    if (currentInput !== '' && previousInput !== '') { // If there's a pending operation, calculate first
        calculate();
    }
    currentOperation = operation;
    if (currentInput !== '') {
        previousInput = currentInput;
        currentInput = '';
    }
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '' || currentOperation === null) return;

    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    currentOperation = null;
    previousInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    let displayText = '';
    if (previousInput !== '') {
        displayText += previousInput + ' ';
    }
    if (currentOperation !== null) {
        displayText += currentOperation + ' ';
    }
    displayText += currentInput;
    display.value = displayText;
}