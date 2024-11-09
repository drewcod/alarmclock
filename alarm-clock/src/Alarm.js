import React, { useState, useEffect } from 'react';
import AlarmSetter from './AlarmSetter';

function Alarm() {
  const [alarmTime, setAlarmTime] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    const checkAlarm = () => {
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      if (alarmTime === currentTime) {
        setIsRinging(true);
      }
    };

    const timer = setInterval(checkAlarm, 1000);
    return () => clearInterval(timer);
  }, [alarmTime]);

  const stopAlarm = () => setIsRinging(false);

  return (
    <div>
      <AlarmSetter setAlarmTime={setAlarmTime} />
      {isRinging && (
        <div>
          <h2>Alarm Ringing!</h2>
          <button onClick={stopAlarm}>Stop</button>
        </div>
      )}
    </div>
  );
}

export default Alarm;
