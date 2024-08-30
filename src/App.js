// src/App.js
import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './index.css';

// Redux Slice
const initialState = {
  displayValue: '0',
  currentOperand: null,
  previousOperand: null,
  operation: null,
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action) => {
      if (state.displayValue === '0') {
        state.displayValue = action.payload;
      } else {
        state.displayValue += action.payload;
      }
    },
    inputOperator: (state, action) => {
      if (state.currentOperand === null) {
        state.currentOperand = parseFloat(state.displayValue);
      } else if (state.operation) {
        state.previousOperand = state.currentOperand;
        state.currentOperand = parseFloat(state.displayValue);
      }
      state.operation = action.payload;
      state.displayValue = '0';
    },
    calculateResult: (state) => {
      const current = parseFloat(state.displayValue);
      const previous = state.currentOperand;
      let result;

      switch (state.operation) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          return;
      }

      state.displayValue = String(result);
      state.currentOperand = result;
      state.operation = null;
    },
    clear: (state) => {
      return initialState;
    },
  },
});

const { inputDigit, inputOperator, calculateResult, clear } = calculatorSlice.actions;

// Redux Store
const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});

// Calculator Component
function Calculator() {
  const displayValue = useSelector((state) => state.calculator.displayValue);
  const dispatch = useDispatch();

  const handleDigit = (digit) => dispatch(inputDigit(digit));
  const handleOperator = (operator) => dispatch(inputOperator(operator));
  const handleEquals = () => dispatch(calculateResult());
  const handleClear = () => dispatch(clear());

  return (
    <div className="w-80 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-800 text-white text-right text-4xl font-mono">{displayValue}</div>
      <div className="grid grid-cols-4 gap-1 p-2">
        <button onClick={handleClear} className="col-span-2 bg-red-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-red-600">AC</button>
        <button onClick={() => handleOperator('/')} className="bg-orange-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-orange-600">/</button>
        <button onClick={() => handleOperator('*')} className="bg-orange-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-orange-600">*</button>
        <button onClick={() => handleOperator('-')} className="bg-orange-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-orange-600">-</button>
        <button onClick={() => handleDigit('7')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">7</button>
        <button onClick={() => handleDigit('8')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">8</button>
        <button onClick={() => handleDigit('9')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">9</button>
        <button onClick={() => handleOperator('+')} className="bg-orange-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-orange-600">+</button>
        <button onClick={() => handleDigit('4')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">4</button>
        <button onClick={() => handleDigit('5')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">5</button>
        <button onClick={() => handleDigit('6')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">6</button>
        <button onClick={handleEquals} className="col-span-2 bg-green-500 text-white text-2xl font-bold py-4 rounded-lg hover:bg-green-600">=</button>
        <button onClick={() => handleDigit('1')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">1</button>
        <button onClick={() => handleDigit('2')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">2</button>
        <button onClick={() => handleDigit('3')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">3</button>
        <button onClick={() => handleDigit('.')} className="bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">.</button>
        <button onClick={() => handleDigit('0')} className="col-span-2 bg-gray-200 text-gray-800 text-2xl font-bold py-4 rounded-lg hover:bg-gray-300">0</button>
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
