import React, { useState } from 'react';
import './LengthConverter.css';

const units = {
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
  inches: 0.0254,
};

const unitNames = Object.keys(units);
const MAX_VALUE = 1000000;

function LengthConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (val === '') {
      setInputValue('');
      setError('');
      return;
    }

    const num = parseFloat(val);

    if (isNaN(num) || num < 0) {
      setError('Please enter a valid positive number.');
    } else if (num > MAX_VALUE) {
      setError('Value too large! Please enter less than 1,000,000.');
    } else {
      setError('');
      setInputValue(val);
    }
  };

  const convert = () => {
    const valueInMeters = parseFloat(inputValue) * units[fromUnit];
    return (valueInMeters / units[toUnit]).toFixed(4);
  };

  return (
    <div className="length-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Length"
        className="length-input"
      />

      {error && <p className="length-error">{error}</p>}

      <div className="selectors">
        <div className="select-box">
          <label>From:</label>
          <select
            size={unitNames.length}
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {unitNames.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="select-box">
          <label>To:</label>
          <select
            size={unitNames.length}
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {unitNames.map((unit) => (
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

export default LengthConverter;
