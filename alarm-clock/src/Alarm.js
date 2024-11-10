import React, { useState, useEffect } from 'react';

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));

      alarms.forEach(alarm => {
        const alarmTime = new Date(`1970-01-01T${alarm.time}`);
        const currentHour = new Date().getHours();
        const alarmHour = alarmTime.getHours();
        const currentAMPM = currentTime.split(' ')[1];
        const alarmAMPM = alarm.time.split(' ')[1];

        if (alarmHour === currentHour && currentAMPM === alarmAMPM) {
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

  // Sort alarms by time, earliest first, considering 12-hour format
  const sortedAlarms = alarms.sort((a, b) => {
    const aTime = new Date(`1970-01-01T${a.time}`);
    const bTime = new Date(`1970-01-01T${b.time}`);
    return aTime - bTime;
  });

  return (
    <div>
      <h1>Alarm Clock</h1>
      <input type="time" onChange={handleAlarmTimeChange} />
      <ol>
        {sortedAlarms.map(alarm => (
          <li key={alarm.id}>
            {alarm.time}
            <button onClick={() => handleDeleteAlarm(alarm.id)}>Delete</button>
          </li>
        ))}
      </ol>
      <audio autoPlay>
        <source src="alarm-sound.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Alarm;