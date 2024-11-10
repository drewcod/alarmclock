import React, { useState, useEffect, useRef, useCallback } from 'react';
import Popup from "./Popup";

function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const currentTimeRef = useRef(currentTime);
  const audioRef = useRef(null);

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
        if (alarmTime === currentTimeRef.current && !isAlarmActive) {
          setIsAlarmActive(true);
          handleDeleteAlarm(alarm.id);
          audioRef.current.play();
          setShowPopup(true);
        }
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [alarms, currentTime, isAlarmActive, handleDeleteAlarm]);
  

  const handleAlarmTimeChange = (event) => {
    setAlarmTime(event.target.value); 
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
      if (hours === '00') {
        hours = '12';
      }
      var goodTime = hours + ':' + mins + ':00 ' + AMPM;
      const newAlarm = {
        id: Date.now(),
        time: badTime,
        compTime: goodTime
      };
      setAlarms([...alarms, newAlarm]);
      setAlarmTime("");
    }
  };

  const handleStopAlarm = () => {
    if (isAlarmActive) {
      setIsAlarmActive(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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
        <h2>Alarm Ringing!</h2>
      )}

      {isAlarmActive && !showPopup && (
        <div>
          <button onClick={handleStopAlarm}>Stop</button>
        </div>
      )}

      {/*
      <audio ref={audioRef} src="\voicemail-13.mp3" />
      */}
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" controls style={{ display: 'none' }} />
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default Alarm;
