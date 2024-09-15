import React from 'react';
import { Provider } from 'react-redux';
import Calculator from './components/Calculator';
import store from './redux/store';
import './index.css';


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
