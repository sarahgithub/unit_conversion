import React, { useState } from 'react';
import './AreaConverter.css';

const units = {
  'square meters': 1,
  'square feet': 0.092903,
  acres: 4046.86,
  hectares: 10000,
};

const unitNames = Object.keys(units);
const MAX_VALUE = 1000000;

function AreaConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('square meters');
  const [toUnit, setToUnit] = useState('square feet');
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
    const valueInSquareMeters = parseFloat(inputValue) * units[fromUnit];
    return (valueInSquareMeters / units[toUnit]).toFixed(4);
  };

  return (
    <div className="area-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter area"
        className="area-input"
      />

      {error && <p className="area-error">{error}</p>}

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

export default AreaConverter;