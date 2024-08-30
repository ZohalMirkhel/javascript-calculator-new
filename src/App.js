import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './index.css';

const initialState = {
  displayValue: '0',
  currentOperand: null,
  operation: null,
  waitingForOperand: false,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action) => {
      if (state.displayValue.includes('.') && action.payload === '.') return;

      if (state.waitingForOperand) {
        state.displayValue = action.payload;
        state.waitingForOperand = false;
      } else {
        state.displayValue =
          state.displayValue === '0' ? action.payload : state.displayValue + action.payload;
      }
    },
    inputOperator: (state, action) => {
      const operator = action.payload;

      if (state.displayValue === '' && operator === '-') {
        state.displayValue = operator;
        state.waitingForOperand = false;
        return;
      }

      if (state.waitingForOperand) {
        if (operator !== '-' && state.operation !== null) {
          state.operation = operator;
          return;
        }
      }

      const currentValue = parseFloat(state.displayValue);

      if (state.currentOperand !== null && state.operation) {
        state.currentOperand = performOperation(state.currentOperand, currentValue, state.operation);
      } else {
        state.currentOperand = currentValue;
      }

      state.operation = operator;
      state.displayValue = '';
      state.waitingForOperand = true;
    },
    calculateResult: (state) => {
      const currentValue = parseFloat(state.displayValue);

      if (state.currentOperand === null || state.operation === null) return;

      const result = performOperation(state.currentOperand, currentValue, state.operation);

      state.displayValue = String(result);
      state.currentOperand = result;
      state.operation = null;
      state.waitingForOperand = false;
    },
    clear: (state) => {
      return initialState;
    },
  },
});

const performOperation = (a, b, op) => {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return b;
  }
};

const { inputDigit, inputOperator, calculateResult, clear } = calculatorSlice.actions;

const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});

function Calculator() {
  const displayValue = useSelector((state) => state.calculator.displayValue);
  const dispatch = useDispatch();

  const handleDigit = (digit) => dispatch(inputDigit(digit));
  const handleOperator = (operator) => dispatch(inputOperator(operator));
  const handleEquals = () => dispatch(calculateResult());
  const handleClear = () => dispatch(clear());

  return (
    <div className="w-80 max-w-sm mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div id="display" className="p-4 bg-gray-900 text-white text-right text-4xl font-mono">
        {displayValue}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <button id="clear" onClick={handleClear} className="bg-[#7544A8] text-white text-2xl font-bold py-4 rounded-lg hover:bg-purple-800 shadow-md">AC</button>
        <button id="parentheses-open" onClick={() => handleOperator('(')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">(</button>
        <button id="parentheses-close" onClick={() => handleOperator(')')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">)</button>
        <button id="percentage" onClick={() => handleOperator('%')} className="bg-[#7544A8] text-white text-2xl font-bold py-4 rounded-lg hover:bg-purple-800 shadow-md">%</button>

        <button id="seven" onClick={() => handleDigit('7')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">7</button>
        <button id="eight" onClick={() => handleDigit('8')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">8</button>
        <button id="nine" onClick={() => handleDigit('9')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">9</button>
        <button id="divide" onClick={() => handleOperator('/')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">/</button>

        <button id="four" onClick={() => handleDigit('4')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">4</button>
        <button id="five" onClick={() => handleDigit('5')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">5</button>
        <button id="six" onClick={() => handleDigit('6')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">6</button>
        <button id="multiply" onClick={() => handleOperator('*')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">*</button>

        <button id="one" onClick={() => handleDigit('1')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">1</button>
        <button id="two" onClick={() => handleDigit('2')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">2</button>
        <button id="three" onClick={() => handleDigit('3')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">3</button>
        <button id="subtract" onClick={() => handleOperator('-')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">-</button>

        <button id="zero" onClick={() => handleDigit('0')} className="col-span-2 bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">0</button>
        <button id="decimal" onClick={() => handleDigit('.')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">.</button>
        <button id="add" onClick={() => handleOperator('+')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">+</button>

        <button id="equals" onClick={handleEquals} className="col-span-4 bg-blue-600 text-white text-2xl font-bold py-4 rounded-lg hover:bg-blue-700 shadow-md">=</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Calculator />
      </div>
    </Provider>
  );
}

export default App;
