import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [alarmTime, setAlarmTime] = useState("");
  const currentTimeRef = useRef(currentTime);
  const [hourDeg, setHourDeg] = useState(0);
  const [minuteDeg, setMinuteDeg] = useState(0);
  const [secondDeg, setSecondDeg] = useState(0);
  const navigate = useNavigate();

  const handleDeleteAlarm = useCallback((id) => {
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
  }, [alarms]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      setCurrentTime(newTime);
      currentTimeRef.current = newTime;

      alarms.forEach(alarm => {
        const alarmTime = alarm.compTime;
        if (alarmTime === currentTimeRef.current) {
          handleDeleteAlarm(alarm.id);
          navigate('/popup');
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarms, currentTime, handleDeleteAlarm]);

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value); 
  };

  const handleAddAlarm = () => {
    if (alarmTime) {
      let badTime = alarmTime;
      let hours = badTime.slice(0, 2);
      let mins = badTime.slice(3, 5);
      let AMPM = 'AM';
      if (hours > 12) {
        hours = hours - 12;
        if (hours < 10) {
          hours = '0' + hours;
        }
        AMPM = 'PM';
      } 
      if (hours === '00') {
        hours = '12';
      } 
      if (hours === '12') {
        hours = '12';
        AMPM = 'PM';
      } 
      let goodTime = hours + ':' + mins + ':00 ' + AMPM;
      
      // Calculate sleep duration
      const alarmDate = new Date();
      alarmDate.setHours(badTime.slice(0, 2));
      alarmDate.setMinutes(badTime.slice(3, 5));
      alarmDate.setSeconds(0);

      const now = new Date();
      const sleepDurationMs = alarmDate.getTime() - now.getTime();
      const sleepHours = Math.floor(sleepDurationMs / (1000 * 60 * 60));
      const sleepMinutes = Math.floor((sleepDurationMs % (1000 * 60 * 60)) / (1000 * 60));
      const sleepString = sleepDurationMs > 0 ? `${sleepHours}h ${sleepMinutes}m` : "Alarm time has passed";

      const newAlarm = {
        id: Date.now(),
        time: badTime,
        compTime: goodTime,
        sleepDuration: sleepString,
      };

      setAlarms([...alarms, newAlarm]);
      setAlarmTime("");
    }
  };

  const sortedAlarms = alarms.sort((a, b) => {
    const aTime = new Date(`1970-01-01T${a.time}`);
    const bTime = new Date(`1970-01-01T${b.time}`);
    return aTime - bTime;
  });

  // Clock component to display the physical clock with rotating hands
  const Clock = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        const newTime = new Date();
        const hours = newTime.getHours();
        const minutes = newTime.getMinutes();
        const seconds = newTime.getSeconds();

        // Calculate the rotation for each hand
        setHourDeg(((hours % 12) * 30) + (minutes / 2)); // 30 degrees for each hour and fractional for minutes
        setMinuteDeg(minutes * 6); // 6 degrees for each minute
        setSecondDeg(seconds * 6); // 6 degrees for each second
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []); // Empty dependency array ensures it runs only once on mount

    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div className="clock">
        {/* Render numbers */}
        {numbers.map((num, index) => (
          <div key={index} className="clock-number">
            {num}
          </div>
        ))}

        {/* Hour, Minute, Second hands */}
        <div
          className="clock-face"
          style={{
            transform: `rotate(${hourDeg}deg)`,
          }}
        >
          <div className="hour-hand" />
        </div>

        <div
          className="clock-face"
          style={{
            transform: `rotate(${minuteDeg}deg)`,
          }}
        >
          <div className="minute-hand" />
        </div>

        <div
          className="clock-face"
          style={{
            transform: `rotate(${secondDeg}deg)`,
          }}
        >
          <div className="second-hand" />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Clock />
      <p className="currentTime">{currentTime}</p>

      <h1 className='title'>Rise and shine, it's a brand new day</h1>
      <div className='setAlarmParent'>
        <input type="time" value={alarmTime} onChange={handleAlarmTimeChange} />
        <button onClick={handleAddAlarm}>Set Alarm</button>
      </div>
      <ol>
        {sortedAlarms.map(alarm => (
          <li key={alarm.id}>
            {alarm.compTime}
            <button onClick={() => handleDeleteAlarm(alarm.id)}>Delete</button>
            <div>Amount of Sleep: {alarm.sleepDuration}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Alarm;
