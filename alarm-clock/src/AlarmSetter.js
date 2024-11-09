import React, { useState } from 'react';

function AlarmSetter({ setAlarmTime }) {
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

  const handleSetAlarm = () => {
    setAlarmTime(`${hour}:${minute}`);
  };

  return (
    <div>
      <input
        type="number"
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        max="23"
        min="0"
      />
      :
      <input
        type="number"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        max="59"
        min="0"
      />
      <button onClick={handleSetAlarm}>Set Alarm</button>
    </div>
  );
}

export default AlarmSetter;
