import { createSlice } from '@reduxjs/toolkit';

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

export const { inputDigit, inputOperator, calculateResult, clear } = calculatorSlice.actions;

export default calculatorSlice.reducer;
