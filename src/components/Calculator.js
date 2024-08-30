import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputDigit, inputOperator, calculateResult, clear } from '../redux/calculatorSlice';

function Calculator() {
  const displayValue = useSelector((state) => state.calculator.displayValue);
  const dispatch = useDispatch();

  const handleDigit = (digit) => dispatch(inputDigit(digit));
  const handleOperator = (operator) => dispatch(inputOperator(operator));
  const handleEquals = () => dispatch(calculateResult());
  const handleClear = () => dispatch(clear());

  return (
    <div className="w-80 max-w-sm mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <div id="display" className="p-4 bg-gray-900 text-white text-right text-4xl font-mono">
        {displayValue}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <button id="clear" onClick={handleClear} className="bg-[#7544A8] text-white text-2xl font-bold py-4 rounded-lg hover:bg-purple-800 shadow-md">AC</button>
        <button id="parentheses-open" onClick={() => handleOperator('(')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">(</button>
        <button id="parentheses-close" onClick={() => handleOperator(')')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">)</button>
        <button id="percentage" onClick={() => handleOperator('%')} className="bg-[#7544A8] text-white text-2xl font-bold py-4 rounded-lg hover:bg-purple-800 shadow-md">%</button>

        <button id="seven" onClick={() => handleDigit('7')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">7</button>
        <button id="eight" onClick={() => handleDigit('8')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">8</button>
        <button id="nine" onClick={() => handleDigit('9')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">9</button>
        <button id="divide" onClick={() => handleOperator('/')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">/</button>

        <button id="four" onClick={() => handleDigit('4')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">4</button>
        <button id="five" onClick={() => handleDigit('5')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">5</button>
        <button id="six" onClick={() => handleDigit('6')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">6</button>
        <button id="multiply" onClick={() => handleOperator('*')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">*</button>

        <button id="one" onClick={() => handleDigit('1')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">1</button>
        <button id="two" onClick={() => handleDigit('2')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">2</button>
        <button id="three" onClick={() => handleDigit('3')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">3</button>
        <button id="subtract" onClick={() => handleOperator('-')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">-</button>

        <button id="zero" onClick={() => handleDigit('0')} className="col-span-2 bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">0</button>
        <button id="decimal" onClick={() => handleDigit('.')} className="bg-gray-700 text-white text-2xl font-bold py-4 rounded-lg hover:bg-gray-600 shadow-md">.</button>
        <button id="add" onClick={() => handleOperator('+')} className="bg-[#4059A1] text-white text-2xl font-bold py-4 rounded-lg hover:bg-[#314887] shadow-md">+</button>

        <button id="equals" onClick={handleEquals} className="col-span-4 bg-blue-600 text-white text-2xl font-bold py-4 rounded-lg hover:bg-blue-700 shadow-md">=</button>
      </div>
    </div>
  );
}

export default Calculator;
