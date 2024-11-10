import React, { useState, useEffect } from 'react';

function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [alarmStatus, setAlarmStatus] = useState(false);
  const [alarms, setAlarms] = useState([null]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());

      if (alarmTime && alarmTime === currentTime) {
        setAlarmStatus(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarmTime, currentTime]);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value);
    setAlarms([...alarms, event.target.value]);
  };

  const handleStopAlarm = () => {
    setAlarmStatus(false);
  };

  return (
    <div>
      <h1>Alarm Clock</h1>
      <input type="time" value={alarmTime} onChange={handleAlarmTimeChange} />
      <p>Current time: {currentTime}</p>
      {alarmStatus && (
        <div>
          <audio autoPlay>
            <source src="alarm-sound.mp3" type="audio/mpeg" />
          </audio>
          <button onClick={handleStopAlarm}>Stop Alarm</button>
        </div>
      )}
      <ul>
        {alarms.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default Alarm;