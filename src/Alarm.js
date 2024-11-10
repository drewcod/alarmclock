import React, { useState, useEffect, useRef } from 'react';

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState(""); // state to hold the selected time
  const currentTimeRef = useRef(currentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setCurrentTime(newTime);
      currentTimeRef.current = newTime;

      alarms.forEach(alarm => {
        const alarmTime = alarm.compTime;
        if (alarmTime === currentTimeRef.current && !isAlarmActive) {
          setIsAlarmActive(true);
          handleDeleteAlarm(alarm.id);
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms, currentTime, isAlarmActive]);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value); // update the alarmTime state when the user selects a time
  };

  const handleAddAlarm = () => {
    if (alarmTime) {
      var badTime = alarmTime;
      var hours = badTime.slice(0, 2);
      var mins = badTime.slice(3, 5);
      var AMPM = 'AM';
      if (hours > 12) {
        hours = hours - 12;
        if (hours < 10) {
          hours = '0' + hours;
        }
        AMPM = 'PM';
      }
      var goodTime = hours + ':' + mins + ':00 ' + AMPM;
      const newAlarm = {
        id: Date.now(),
        time: badTime,
        compTime: goodTime
      };
      setAlarms([...alarms, newAlarm]); // add the new alarm
      setAlarmTime(""); // reset the selected time after adding the alarm
    }
  };

  const handleDeleteAlarm = (id) => {
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  const handleStopAlarm = () => {
    if (isAlarmActive) {
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
      <input type="time" value={alarmTime} onChange={handleAlarmTimeChange} />
      <button onClick={handleAddAlarm}>Set Alarm</button>
      <p>Current time: {currentTime}</p>
      <ol>
        {sortedAlarms.map(alarm => (
          <li key={alarm.id}>
            {alarm.compTime}
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
    </div>
  );
}

export default Alarm;
