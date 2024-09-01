import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayValue: '0',
  expression: '',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  lastResult: null,
};

const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action) => {
      const digit = action.payload;

      if (digit === '.' && state.displayValue.includes('.')) return;

      if (state.waitingForOperand) {
        state.displayValue = digit === '.' ? '0.' : digit;
        state.waitingForOperand = false;
      } else {
        state.displayValue = state.displayValue === '0' && digit !== '.'
          ? digit
          : state.displayValue + digit;
      }

      state.expression += digit;
    },

    inputOperator: (state, action) => {
      const inputOperator = action.payload;
      if (inputOperator === '-' && state.waitingForOperand) {
        if (isOperator(state.expression.slice(-1))) {
          state.displayValue = '-';
          state.expression += '-';
          state.waitingForOperand = false;
          return;
        }
      }

      if (state.waitingForOperand && isOperator(inputOperator)) {
        if (isOperator(state.expression.slice(-1))) {
          state.expression = state.expression.slice(0, -1) + inputOperator;
        } else {
          state.expression += ` ${inputOperator} `;
        }
        state.operator = inputOperator;
        return;
      }

      if (state.operator && !state.waitingForOperand) {
        const result = performCalculation(state);
        state.displayValue = String(result);
        state.previousValue = result;
        state.expression = `${result} ${inputOperator} `;
      } else {
        state.previousValue = state.displayValue;
        state.expression += ` ${inputOperator} `;
      }

      state.operator = inputOperator;
      state.waitingForOperand = true;
    },

    calculateResult: (state) => {
      if (state.operator && state.previousValue !== null) {
        const result = performCalculation(state);
        state.displayValue = String(result);
        state.previousValue = result;
        state.expression = `${state.expression} = ${result}`;
        state.lastResult = result;
        state.operator = null;
        state.waitingForOperand = false;
      }
    },

    clear: (state) => {
      state.displayValue = '0';
      state.expression = '';
      state.previousValue = null;
      state.operator = null;
      state.waitingForOperand = false;
      state.lastResult = null;
    },

    handleEqualAndOperator: (state, action) => {
      if (state.lastResult !== null) {
        state.displayValue = state.lastResult;
        state.previousValue = state.lastResult;
        state.operator = action.payload;
        state.expression = `${state.lastResult} ${action.payload} `;
        state.waitingForOperand = true;
      }
    },
  },
});

const performCalculation = (state) => {
  const prev = parseFloat(state.previousValue);
  const current = parseFloat(state.displayValue);

  if (isNaN(prev) || isNaN(current)) return state.displayValue;

  let result;
  switch (state.operator) {
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
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      result = current;
  }

  return parseFloat(result.toFixed(4));
};

export const {
  inputDigit,
  inputOperator,
  calculateResult,
  clear,
  handleEqualAndOperator,
} = calculatorSlice.actions;
export default calculatorSlice.reducer;
