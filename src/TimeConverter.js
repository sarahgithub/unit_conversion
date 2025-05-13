import React, { useState } from 'react';
import './TimeConverter.css';

const units = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
};

const unitNames = Object.keys(units);
const MAX_VALUE = 1000000;

function TimeConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('seconds');
  const [toUnit, setToUnit] = useState('minutes');
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
    const valueInSeconds = parseFloat(inputValue) * units[fromUnit];
    return (valueInSeconds / units[toUnit]).toFixed(4);
  };

  return (
    <div className="time-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter time"
        className="time-input"
      />

      {error && <p className="time-error">{error}</p>}

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

export default TimeConverter;