import React, { useState, useEffect, useRef } from 'react';

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const audioRef = useRef(null);
  const currentTimeRef = useRef(currentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setCurrentTime(newTime);
      currentTimeRef.current = newTime;

      alarms.forEach(alarm => {
        const alarmTime = alarm.time;
        const [alarmHour, alarmMinute] = alarmTime.split(':').map(Number);
        const [currentHour, currentMinute] = currentTimeRef.current.split(':').map(Number);
        
        if (alarmHour === currentHour && alarmMinute === currentMinute && !isAlarmActive) {
          setIsAlarmActive(true);
          audioRef.current.play();
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms, currentTime, isAlarmActive]);

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

  const handleStopAlarm = () => {
    if (isAlarmActive) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAlarmActive(false);
    }
  };

  const sortedAlarms = alarms.sort((a, b) => {
    const aTime = new Date(`1970-01-01T${a.time}`);
    const bTime = new Date(`1970-01-01T${b.time}`);
    return aTime - bTime;
  });

  return (
    <div>
      <h1>Alarm Clock</h1>
      <input type="time" onChange={handleAlarmTimeChange} />
      <p>Current time: {currentTime}</p>
      <ol>
        {sortedAlarms.map(alarm => (
          <li key={alarm.id}>
            {new Date(`1970-01-01T${alarm.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            <button onClick={() => handleDeleteAlarm(alarm.id)}>Delete</button>
          </li>
        ))}
      </ol>

      {isAlarmActive && (
        <div>
          <h2>Alarm Ringing!</h2>
          <button onClick={handleStopAlarm}>Stop</button>
        </div>
      )}

      <audio ref={audioRef}>
        <source src="voicemail-13.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Alarm;
