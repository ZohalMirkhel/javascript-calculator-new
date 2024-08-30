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
