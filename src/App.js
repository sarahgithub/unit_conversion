import React, { useState } from 'react';
import './App.css';

// Import the placeholder components
import LengthConverter from './LengthConverter';
import WeightConverter from './WeightConverter';
import TemperatureConverter from './TemperatureConverter';
import VolumeConverter from './VolumeConverter';
import TimeConverter from './TimeConverter';
import AreaConverter from './AreaConverter';
import SpeedConverter from './SpeedConverter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [activeTab, setActiveTab] = useState('length'); // Default to length

  // Function to apply 'active' class to the selected tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
<h1>
  <FontAwesomeIcon icon={faRulerCombined} style={{ marginRight: '15px' }} />
  Unit Converter
</h1>

      <nav>
        <button
          onClick={() => handleTabClick('length')}
          className={activeTab === 'length' ? 'active' : ''}
        >
          Length
        </button>
        <button
          onClick={() => handleTabClick('weight')}
          className={activeTab === 'weight' ? 'active' : ''}
        >
          Weight
        </button>
        <button
          onClick={() => handleTabClick('temperature')}
          className={activeTab === 'temperature' ? 'active' : ''}
        >
          Temperature
        </button>
        <button
          onClick={() => handleTabClick('volume')}
          className={activeTab === 'volume' ? 'active' : ''}
        >
          Volume
        </button>
        <button
          onClick={() => handleTabClick('time')}
          className={activeTab === 'time' ? 'active' : ''}
        >
          Time
        </button>
        <button
          onClick={() => handleTabClick('area')}
          className={activeTab === 'area' ? 'active' : ''}
        >
          Area
        </button>
        <button
          onClick={() => handleTabClick('speed')}
          className={activeTab === 'speed' ? 'active' : ''}
        >
          Speed
        </button>
      </nav>

      <div className="conversion-section">
        {activeTab === 'length' && <LengthConverter />}
        {activeTab === 'weight' && <WeightConverter />}
        {activeTab === 'temperature' && <TemperatureConverter />}
        {activeTab === 'volume' && <VolumeConverter />}
        {activeTab === 'time' && <TimeConverter />}
        {activeTab === 'area' && <AreaConverter />}
        {activeTab === 'speed' && <SpeedConverter />}
      </div>
    </div>
  );
}

export default App;