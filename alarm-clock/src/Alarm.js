import React, { useState, useEffect } from 'react';

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());

      alarms.forEach(alarm => {
        if (alarm.time === currentTime) {
          // Play alarm sound
          const audio = document.querySelector('audio');
          audio.play();
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms, currentTime]);

  const handleAlarmTimeChange = (event) => {
    const newAlarm = {
      id: Date.now(),
      time: event.target.value
    };
    setAlarms([...alarms, newAlarm]);
  };

  const handleDeleteAlarm = (id) => {
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  return (
    <div>
      <h1>Alarm Clock</h1>
      <input type="time" onChange={handleAlarmTimeChange} />
      <ul>
        {alarms.map(alarm => (
          <li key={alarm.id}>
            {alarm.time}
            <button onClick={() => handleDeleteAlarm(alarm.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <audio autoPlay>
        <source src="alarm-sound.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Alarm;