import React, { useState } from 'react';
import './SpeedConverter.css';

const units = {
  'km/h': 0.277778,
  'mph': 0.44704,
  'm/s': 1,
};

const unitNames = Object.keys(units);
const MAX_VALUE = 1000000;

function SpeedConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('km/h');
  const [toUnit, setToUnit] = useState('m/s');
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
    const valueInMS = parseFloat(inputValue) * units[fromUnit];
    return (valueInMS / units[toUnit]).toFixed(4);
  };

  return (
    <div className="speed-container">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter speed"
        className="speed-input"
      />

      {error && <p className="speed-error">{error}</p>}

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

export default SpeedConverter;