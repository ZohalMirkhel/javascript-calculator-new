import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

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
    <div>
      <div>{displayValue}</div>
      <div>
        <button onClick={handleClear}>AC</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleDigit('7')}>7</button>
        <button onClick={() => handleDigit('8')}>8</button>
        <button onClick={() => handleDigit('9')}>9</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleDigit('4')}>4</button>
        <button onClick={() => handleDigit('5')}>5</button>
        <button onClick={() => handleDigit('6')}>6</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleDigit('1')}>1</button>
        <button onClick={() => handleDigit('2')}>2</button>
        <button onClick={() => handleDigit('3')}>3</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={() => handleDigit('0')}>0</button>
        <button onClick={() => handleDigit('.')}>.</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}

export default App;
