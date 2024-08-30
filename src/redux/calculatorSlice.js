import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayValue: '0',
  expression: '',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
};

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

      if (state.operator && !state.waitingForOperand) {
        const result = performCalculation(state);
        state.displayValue = String(result);
        state.previousValue = result;
        state.expression = `${result} ${inputOperator}`;
      } else {
        if (state.expression.endsWith(' ')) {
          state.expression = state.expression.slice(0, -1);
        }
        state.expression += ` ${inputOperator} `;
        state.previousValue = state.displayValue;
        state.operator = inputOperator;
        state.waitingForOperand = true;
      }
    },

    calculateResult: (state) => {
      const result = performCalculation(state);
      state.displayValue = String(result);
      state.previousValue = null;
      state.operator = null;
      state.waitingForOperand = false;
      state.expression = `${state.expression} = ${result}`;
    },

    clear: (state) => {
      state.displayValue = '0';
      state.expression = '';
      state.previousValue = null;
      state.operator = null;
      state.waitingForOperand = false;
    },
  }
});

const performCalculation = (state) => {
  const prev = parseFloat(state.previousValue);
  const current = parseFloat(state.displayValue);

  if (isNaN(prev) || isNaN(current)) return state.displayValue;

  switch (state.operator) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return current !== 0 ? prev / current : 'Error';
    default:
      return current;
  }
};

export const { inputDigit, inputOperator, calculateResult, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;
