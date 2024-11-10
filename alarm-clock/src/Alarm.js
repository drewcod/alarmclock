import React, { useState, useEffect } from 'react';

function Alarm() {
  const [alarmTime, setAlarmTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [alarmStatus, setAlarmStatus] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());

      if (alarmTime && alarmTime === currentTime && alarmStatus) {
        // Play audio only when alarm is set and active
        const audio = document.querySelector('audio');
        audio.play();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarmTime, currentTime, alarmStatus]);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value);
  };

  const handleStartAlarm = () => {
    setAlarmStatus(true);
  };

  const handleStartAlarm = () => {
    setAlarmStatus(true);
  };

  const handleStopAlarm = () => {
    setAlarmStatus(false);
  };

  return (
    <div>
      <h1>Alarm Clock</h1>
      <input type="time" value={alarmTime} onChange={handleAlarmTimeChange} />
      <p>Current time: {currentTime}</p>
      {alarmTime && (
        <div>
          <button onClick={handleStartAlarm}>Start Alarm</button>
          {alarmStatus && (
            <div>
              <audio autoPlay>
                <source src="alarm-sound.mp3" type="audio/mpeg" />
              </audio>
              <button onClick={handleStopAlarm}>Stop Alarm</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Alarm;