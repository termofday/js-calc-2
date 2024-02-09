const displayLastcalc = document.getElementById('display-lastcalc');
const displayCalc = document.getElementById('display-calc');

displayCalc.textContent = '0';

let operator = '';
let lastOperator = '';
let currentOperation = null;

let resetTheScreen = false;

/*
const btnClear = document.getElementById('btn-clear');
const btnDel = document.getElementById('btn-delete');
const btnEqual = document.getElementById('btn-equals');
const btnPoint = document.getElementById('btn-point');
*/

const clearDisplay = () => {
  displayLastcalc.textContent = '';
  displayCalc.textContent = '0';
  
  operator = '';
  lastOperator = '';
  currentOperation = null;
}

const resetDisplay = () => {
  displayCalc.textContent = '';
  resetTheScreen = false;
}

const appendNum = (num) => {
  if (displayCalc.textContent === '0' || resetTheScreen) {
    resetDisplay();
  }
  displayCalc.textContent += num;
}

const appendPoint = () => {
  if (displayCalc.textContent === '') {
    displayCalc.textContent = '0';
  }
  if (displayCalc.textContent.includes('.')) {
    return
  }
  displayCalc.textContent += '.';
}

const getResult = (num) => {
  return Math.round((num * 1000) / 1000);
}

const add = (a, b) => {
  return a + b
}

const sub = (a, b) => {
  return a - b
}

const mul = (a, b) => {
  return a * b
}

const div = (a, b) => {
  return a / b
}

const operate = (op, a, b) => {
  a = Number(a);
  b = Number(b);
  switch(op) {
    case '+':
      return add(a, b)
    break;
    case '-':
      return sub(a, b)
    break;
    case '*':
      return mul(a, b)
    break;
    case '/':
      if (b === 0) {
        return null
      } else {
        return div(a, b)
      }
    break;
    default:
      return null
    break;
  }
}

const goEval = () => {
  if (currentOperation === null || resetTheScreen) {
    return
  }
  if (currentOperation === '/' && displayCalc.textContent === '0') {
    alert("Error");
    return
  }

  lastOperator = displayCalc.textContent;
  displayCalc.textContent = getResult(operate(currentOperation, operator, lastOperator));
  displayLastcalc.textContent = `${operator} ${currentOperation} ${lastOperator}`;
  currentOperation = null;
}

const setOperation = (op) => {
  if (currentOperation !== null) {
    goEval();
  }

  operator = displayCalc.textContent;
  currentOperation = op;
  displayLastcalc.textContent = `${operator} ${currentOperation}`;
  resetTheScreen = true;
}

const deleteChar = () => {
  if (displayCalc.textContent.length > 1) {
  displayCalc.textContent = displayCalc.textContent.toString().slice(0, -1)
  }
  else {
    displayCalc.textContent = '0'
  }
}

const btnHandler = (e) => {

  switch (e) {
    case 'clear':
      clearDisplay();
    break;
    case 'delete':
      deleteChar();
    break;
    case '+':
      setOperation('+');
    break;
    case '-':
      setOperation('-');
    break;
    case '*':
      setOperation('*');
    break;
    case '/':
      setOperation('/');
    break;
    case '.':
      appendPoint();
    break;
    case '=':
      goEval();
    break;
    case '9':
      appendNum('9');
    break;
    case '8':
      appendNum('8');
    break;
    case '7':
      appendNum('7');
    break;
    case '6':
      appendNum('6');
    break;
    case '5':
      appendNum('5');
    break;
    case '4':
      appendNum('4');
    break;
    case '3':
      appendNum('3');
    break;
    case '2':
      appendNum('2');
    break;
    case '1':
      appendNum('1');
    break;
    case '0':
      appendNum('0');
    break;
    default:
      console.error("Error in btnHandler()");
    break;
  }
}