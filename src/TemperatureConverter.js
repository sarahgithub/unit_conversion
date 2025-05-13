import React, { useState } from 'react';
import './TemperatureConverter.css';

const units = ['Celsius', 'Fahrenheit', 'Kelvin'];
const MAX_VALUE = 1000000;
const MIN_KELVIN = 0;

function TemperatureConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Celsius');
  const [toUnit, setToUnit] = useState('Fahrenheit');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (val === '') {
      setInputValue('');
      setError('');
      return;
    }

    const num = parseFloat(val);

    if (isNaN(num)) {
      setError('Please enter a valid number.');
    } else if (num > MAX_VALUE) {
      setError('Value too large! Please enter less than 1,000,000.');
    } else if (fromUnit === 'Kelvin' && num < MIN_KELVIN) {
      setError('Kelvin cannot be negative.');
    } else if (fromUnit === 'Celsius' && num < -273.15) {
      setError('Celsius cannot be below absolute zero (-273.15°C).');
    } else if (fromUnit === 'Fahrenheit' && num < -459.67) {
      setError('Fahrenheit cannot be below absolute zero (-459.67°F).');
    } else {
      setError('');
      setInputValue(val);
    }
  };

  const convert = () => {
    const value = parseFloat(inputValue);

    // Convert from input to Celsius
    let tempInCelsius;
    if (fromUnit === 'Celsius') tempInCelsius = value;
    else if (fromUnit === 'Fahrenheit') tempInCelsius = (value - 32) * (5 / 9);
    else if (fromUnit === 'Kelvin') tempInCelsius = value - 273.15;

    // Convert from Celsius to output unit
    let result;
    if (toUnit === 'Celsius') result = tempInCelsius;
    else if (toUnit === 'Fahrenheit') result = tempInCelsius * (9 / 5) + 32;
    else if (toUnit === 'Kelvin') result = tempInCelsius + 273.15;

    return result.toFixed(2);
  };

  return (
    <div className="temperature-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter temperature"
        className="temperature-input"
      />

      {error && <p className="temperature-error">{error}</p>}

      <div className="selectors">
        <div className="select-box">
          <label>From:</label>
          <select
            size={units.length}
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="select-box">
          <label>To:</label>
          <select
            size={units.length}
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="result">
        {inputValue && !error && !isNaN(inputValue) && (
          <span>
            {convert()} {toUnit}
          </span>
        )}
      </div>
    </div>
  );
}

export default TemperatureConverter;