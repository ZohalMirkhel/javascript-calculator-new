import { createSlice } from '@reduxjs/toolkit';
import { evaluate } from 'mathjs';

const initialState = {
  displayValue: '0',
  expression: '',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  lastResult: null,
  lastWasEquals: false,
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
      state.lastWasEquals = false;
    },

    inputOperator: (state, action) => {
      const nextOperator = action.payload;

      if (state.lastWasEquals) {
        state.expression = `${state.lastResult} ${nextOperator} `;
        state.displayValue = `${state.lastResult} ${nextOperator} `;
        state.lastResult = null;
      } else {
        if (state.waitingForOperand) {
          if (nextOperator === '-') {
            state.displayValue = state.displayValue.slice(0, -1) + nextOperator;
            state.expression = state.expression.slice(0, -1) + nextOperator;
          } else {
            state.expression = state.expression.slice(0, -2) + ` ${nextOperator} `;
            state.displayValue = state.displayValue.slice(0, -2) + ` ${nextOperator} `;
          }
        } else {
          state.expression += ` ${nextOperator} `;
          state.displayValue += ` ${nextOperator} `;
        }

        state.operator = nextOperator;
        state.waitingForOperand = true;
      }

      state.lastWasEquals = false;
    },

    calculateResult: (state) => {
      try {
        const trimmedExpression = state.expression.trim();
        if (isOperator(trimmedExpression.charAt(trimmedExpression.length - 1))) {
          state.displayValue = 'Error';
          state.expression = '';
          return;
        }

        const result = evaluate(trimmedExpression);
        state.displayValue = parseFloat(result).toFixed(10).replace(/\.?0+$/, '');
        state.expression = state.displayValue;
        state.lastResult = parseFloat(state.displayValue);
        state.waitingForOperand = true;
        state.lastWasEquals = true;
      } catch (error) {
        state.displayValue = 'Error';
        state.expression = '';
        state.lastResult = null;
        state.waitingForOperand = false;
        state.lastWasEquals = false;
      }
    },

    clear: (state) => {
      state.displayValue = '0';
      state.expression = '';
      state.previousValue = null;
      state.operator = null;
      state.waitingForOperand = false;
      state.lastResult = null;
      state.lastWasEquals = false;
    },

    handleEqualAndOperator: (state, action) => {
      const inputOperator = action.payload;
    
      if (state.lastResult !== null) {
        state.expression = `${state.lastResult} ${inputOperator} `;
        state.displayValue = `${state.lastResult} ${inputOperator} `;
        state.waitingForOperand = true;
        state.operator = inputOperator;
        state.lastResult = null;
        state.lastWasEquals = false;
      } else {
        state.expression += ` ${inputOperator} `;
        state.displayValue += ` ${inputOperator} `;
        state.waitingForOperand = true;
        state.operator = inputOperator;
      }
    },
  },
});

export const {
  inputDigit,
  inputOperator,
  calculateResult,
  clear,
  handleEqualAndOperator,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
