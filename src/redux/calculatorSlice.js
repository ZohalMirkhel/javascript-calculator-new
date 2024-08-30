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

      // Update the expression
      if (state.operator) {
        state.expression = `${state.previousValue} ${state.operator} ${state.displayValue}`;
      } else {
        state.expression = state.displayValue;
      }
    },

    inputOperator: (state, action) => {
      const inputOperator = action.payload;

      // Handle the case where the operator is '-' and waiting for operand
      if (inputOperator === '-' && state.waitingForOperand) {
        state.displayValue = inputOperator; // Display the negative sign
        state.waitingForOperand = false;
        state.expression += ` ${inputOperator}`;
        return;
      }

      if (state.operator && !state.waitingForOperand) {
        // Perform the calculation before updating the operator
        const result = performCalculation(state);
        state.displayValue = String(result);
        state.previousValue = result;
        state.expression = `${result} ${inputOperator}`;
      } else if (state.operator && inputOperator !== '-') {
        // Replace the operator with the new one
        state.expression = state.expression.slice(0, -1) + inputOperator;
      } else {
        state.previousValue = state.displayValue;
        state.expression = `${state.expression} ${inputOperator}`;
      }

      state.operator = inputOperator;
      state.waitingForOperand = true;
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
