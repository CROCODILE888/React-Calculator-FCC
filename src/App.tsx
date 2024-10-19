import { useState } from 'react';
import './App.css'

interface NumberButtonProps {
  id: string;
  num: string;
  handleNumbers: (value: string) => void;
};

interface OperatorButtonProps {
  id: string;
  operator: string;
  handleOperators: (operator: string) => void;
};
const NumberButton = ({ id, num, handleNumbers }: NumberButtonProps) => {
  return (
    <button 
    id={id}
    onClick={()=>handleNumbers(num)}>{num}</button>
  )
}

const OperatorButton = ({ id, operator, handleOperators }: OperatorButtonProps) => {
  return (
    <button 
    id={id}
    onClick={()=>handleOperators(operator)}>{operator}</button>
  )
}

const App = () => {

  // Numbers with corresponding IDs
  const nums = [
    { num: '0', id: 'zero' },
    { num: '1', id: 'one' },
    { num: '2', id: 'two' },
    { num: '3', id: 'three' },
    { num: '4', id: 'four' },
    { num: '5', id: 'five' },
    { num: '6', id: 'six' },
    { num: '7', id: 'seven' },
    { num: '8', id: 'eight' },
    { num: '9', id: 'nine' }
];

  // Operators with corresponding IDs
  const operators = [
    { operator: "+", id: "add" },
    { operator: "-", id: "subtract" },
    { operator: "*", id: "multiply" },
    { operator: "/", id: "divide" }
  ];

  const [total, setTotal]= useState('');
  const [display, setDisplay] = useState('0');
  const [isNewNumber, setIsNewNumber] = useState(false);
  const [currentOperator, setCurrentOperator] = useState('')

  const handleNumbers = (value:string) => {
    if(display=='0' || isNewNumber){
      setDisplay(value);
      setIsNewNumber(false)
    }
    else{
      setDisplay((prev) => prev + value)
    }
  }

  const handleOperators = (operator: string) => {
    if (currentOperator && !isNewNumber) {
      const newTotal = eval(`${total}${currentOperator}${display}`);
      setTotal(newTotal.toString());
      setDisplay(newTotal.toString())
    }else{
      setTotal(display);
    }
    setIsNewNumber(true);
    setCurrentOperator(operator);
  }

  const handleClear = () => {
    setTotal('0');
    setDisplay('0')
  }

  return (
    <div className='calcultor'>
      <div id='display'>
        {display}
      </div>
      {/* Render number buttons */}
      {nums.map((item, index) => (
        <NumberButton key={index} id={item.id} num={item.num} handleNumbers={handleNumbers}/>
      ))}

      {/* Render operator buttons */}
      {operators.map((item, index) => (
        <OperatorButton key={index} id={item.id} operator={item.operator} handleOperators={handleOperators}/>
      ))}

      {/* Equal button */}
      <button id="equals">=</button>

      {/* Decimal button */}
      <button id="decimal">.</button>

      {/* Clear button */}
      <button 
      id="clear"
      onClick={handleClear}>C</button>

    </div>
  )
}

export default App
