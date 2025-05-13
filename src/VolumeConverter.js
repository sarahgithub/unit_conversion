import React, { useState } from 'react';
import './VolumeConverter.css';

const units = {
  liters: 1,
  milliliters: 0.001,
  gallons: 3.78541,
  cups: 0.24,
};

const unitNames = Object.keys(units);
const MAX_VALUE = 1000000;

function VolumeConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('liters');
  const [toUnit, setToUnit] = useState('milliliters');
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
    const valueInLiters = parseFloat(inputValue) * units[fromUnit];
    return (valueInLiters / units[toUnit]).toFixed(4);
  };

  return (
    <div className="volume-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter volume"
        className="volume-input"
      />

      {error && <p className="volume-error">{error}</p>}

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

export default VolumeConverter;
