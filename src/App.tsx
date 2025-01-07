import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const operators = ['+', '-', '*', '/'];

  useEffect(() => {
    // Listen for keydown events
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      // Handle number keys
      if (/[\d.]/.test(key)) {
        handleInput(key);
      }
      // Handle operator keys
      else if (['/', '*', '-', '+'].includes(key)) {
        handleOperator(key);
      }
      // Handle Enter key for equals
      else if (key === 'Enter') {
        handleEquals();
      }
      // Handle Backspace key for clearing
      else if (key === 'Backspace') {
        handleClear();
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [formula, input, evaluated]);

  const handleClear = () => {
    setInput('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleInput = (value: string) => {
    if (evaluated) {
      setInput(value);
      setFormula(value);
      setEvaluated(false);
      return;
    }

    if (value === '0' && input === '0') return;

    if (value === '.' && input.includes('.')) return;

    if (input === '0' && value !== '.') {
      setInput(value);
    } else {
      setInput(input + value);
    }

    setFormula(formula + value);
  };

  const handleOperator = (operator: string) => {
    if (evaluated) {
      setFormula(input + operator);
      setEvaluated(false);
    } else {
      const lastChar = formula.slice(-1);
      const secondLastChar = formula.slice(-2, -1);

      if (operators.includes(lastChar)) {
        if (operator === '-' && !operators.includes(secondLastChar)) {
          // Allow negative numbers like 5 * -5
          setFormula(formula + operator);
        } else {
          // Replace consecutive operators, keeping the latest one
          // eslint-disable-next-line no-useless-escape
          const updatedFormula = formula.replace(/[*+/\-]+$/, '') + operator;
          setFormula(updatedFormula);
        }
      } else {
        setFormula(formula + operator);
      }
    }

    setInput(operator);
  };

  const handleEquals = () => {
    try {
      const result = eval(formula);
      setInput(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    } catch {
      setInput('Error');
      setFormula('');
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>C</button>
        <button id="divide" onClick={() => handleOperator('/')}>/</button>
        <button id="multiply" onClick={() => handleOperator('*')}>*</button>

        <button id="seven" onClick={() => handleInput('7')}>7</button>
        <button id="eight" onClick={() => handleInput('8')}>8</button>
        <button id="nine" onClick={() => handleInput('9')}>9</button>
        <button id="subtract" onClick={() => handleOperator('-')}>-</button>


        <button id="four" onClick={() => handleInput('4')}>4</button>
        <button id="five" onClick={() => handleInput('5')}>5</button>
        <button id="six" onClick={() => handleInput('6')}>6</button>
        <button id="add" onClick={() => handleOperator('+')}>+</button>
        <button id="one" onClick={() => handleInput('1')}>1</button>
        <button id="two" onClick={() => handleInput('2')}>2</button>
        <button id="three" onClick={() => handleInput('3')}>3</button>
        <button id="decimal" onClick={() => handleInput('.')}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
        <button id="zero" onClick={() => handleInput('0')}>0</button>

      </div>
    </div>
  );
}

export default App;