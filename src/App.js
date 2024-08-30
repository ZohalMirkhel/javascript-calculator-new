import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './index.css';

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
      <div className="p-4 bg-gray-900 text-white text-right text-4xl font-mono">{displayValue}</div>
      <div className="grid grid-cols-4 gap-1">
        <button onClick={handleClear} className="bg-purple-600 text-white text-2xl font-bold py-4 rounded-lg hover:bg-purple-700">AC</button>
        <button onClick={() => handleOperator('(')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">(</button>
        <button onClick={() => handleOperator(')')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">)</button>
        <button onClick={() => handleOperator('%')} className="bg-gray-600 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-700">%</button>

        <button onClick={() => handleDigit('7')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">7</button>
        <button onClick={() => handleDigit('8')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">8</button>
        <button onClick={() => handleDigit('9')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">9</button>
        <button onClick={() => handleOperator('/')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">/</button>

        <button onClick={() => handleDigit('4')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">4</button>
        <button onClick={() => handleDigit('5')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">5</button>
        <button onClick={() => handleDigit('6')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">6</button>
        <button onClick={() => handleOperator('*')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">*</button>

        <button onClick={() => handleDigit('1')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">1</button>
        <button onClick={() => handleDigit('2')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">2</button>
        <button onClick={() => handleDigit('3')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">3</button>
        <button onClick={() => handleOperator('-')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">-</button>

        <button onClick={() => handleDigit('0')} className="col-span-2 bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600">0</button>
        <button onClick={() => handleDigit('.')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">.</button>
        <button onClick={() => handleOperator('+')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887]">+</button>

        <button onClick={handleEquals} className="col-span-4 bg-blue-600 text-white text-2xl font-bold py-4 rounded-lg hover:bg-blue-700">=</button>
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
