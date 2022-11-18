// DOM elements
const display = document.querySelector('#screen');

const clear = document.querySelector('#clear');
const backSpace = document.querySelector('#delete');

const decimal = document.querySelector('#btn-dot');
const number0 = document.querySelector('#btn-0');
const number1 = document.querySelector('#btn-1');
const number2 = document.querySelector('#btn-2');
const number3 = document.querySelector('#btn-3');
const number4 = document.querySelector('#btn-4');
const number5 = document.querySelector('#btn-5');
const number6 = document.querySelector('#btn-6');
const number7 = document.querySelector('#btn-7');
const number8 = document.querySelector('#btn-8');
const number9 = document.querySelector('#btn-9');

const devision = document.querySelector('#devide');
const multiply = document.querySelector('#multiply');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');
const equal = document.querySelector('#equal');

const numberElementArray = [
    number0, number1, number2, number3, number4,
    number5, number6, number7, number8, number9,
];

// variables

let valueStringInMemory = null;
let operatorInMemory = null;






// functions

function getValueAsString(){
    const currentDisplayString = display.textContent;
    return currentDisplayString.split(',').join('');
}

function getValueAsNumber(){
    return parseFloat(getValueAsString());
}

function setStringAsValue(valueString){
    if(valueString[valueString.length - 1] === '.'){
        display.textContent += '.';
        return;
    }

    const [wholeNumberString, decimalNumberString] = valueString.split('.');
    if ( decimalNumberString){
        display.textContent = parseFloat(wholeNumberString).toLocaleString() + '.' + decimalNumberString;
    } else {
        display.textContent = parseFloat(wholeNumberString).toLocaleString();
    }
}


function handleNumberClick(numString) {
    const currentDisplayString = getValueAsString();
    if(currentDisplayString === '0'){
        setStringAsValue(numString);
    } else {
        setStringAsValue(currentDisplayString + numString);
    }
}

function getResultOfOperationAsString() {
    const currentDisplayNumber = getValueAsNumber();
    const valueNumberInMemory = parseFloat(valueStringInMemory);
    let newValueNumber;
    if (operatorInMemory === 'plus') {
        newValueNumber = valueNumberInMemory + currentDisplayNumber;
    } else if (operatorInMemory === 'minus') {
        newValueNumber = valueNumberInMemory - currentDisplayNumber;
    } else if (operatorInMemory === 'multiply') {
        newValueNumber = valueNumberInMemory * currentDisplayNumber;
    } else if (operatorInMemory === 'devision') {
        newValueNumber = valueNumberInMemory / currentDisplayNumber;
    }
    return newValueNumber.toString();
}

function handleOperatorClick(operation) {
    const currentDisplayString = getValueAsString();
    if (!valueStringInMemory) {
        valueStringInMemory = currentDisplayString;
        operatorInMemory = operation;
        setStringAsValue('0');
        return;
    }
    valueNumberInMemory = getResultOfOperationAsString();
    operatorInMemory = operation;
    setStringAsValue('0');
}


// Add event listener clear backspace

clear.addEventListener('click', () => {
    setStringAsValue('0');
    valueStringInMemory = null;
    operatorInMemory = null;
})

backSpace.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
})

clear.addEventListener('keyup', (e) => {
    if(e.keyCode === 27){
        setStringAsValue('0');
        valueStringInMemory = null;
        operatorInMemory = null;
    }
})

backSpace.addEventListener('keyup', (e) => {
    if(e.keyCode === 8){
        display.textContent = display.textContent.slice(0, -1);
    }
})


// Add Event Listener to operators

plus.addEventListener('click', () => {
    handleOperatorClick('plus');
});

minus.addEventListener('click', () => {
    handleOperatorClick('minus');
});

multiply.addEventListener('click', () => {
    handleOperatorClick('multiply');
});

devision.addEventListener('click', () => {
    handleOperatorClick('devision');
});

equal.addEventListener('click', () => {
    if(valueStringInMemory) {
        setStringAsValue(getResultOfOperationAsString());
        valueStringInMemory = null;
        operatorInMemory = null;
    }
});

// Add Event listener to decimal

for(let index = 0; index < numberElementArray.length; index++){
    const numberElement = numberElementArray[index];
    numberElement.addEventListener('click', () => {
        handleNumberClick(index.toString());
    });
}

decimal.addEventListener('click', () => {
    const currentDisplayString = getValueAsString();
    if(!currentDisplayString.includes('.')){
        setStringAsValue(currentDisplayString + '.');
    }
})
