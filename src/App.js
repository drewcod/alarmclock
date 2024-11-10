import React from 'react';
import Alarm from './Alarm';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


function App() {
  return (
    <div>
      <Alarm />
    </div>
  );
}

export default App;