import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alarm from './Alarm';
import Popup from './Popup';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/alarmclock" element={<Alarm />} />
                <Route path="/popup" element={<Popup />} />
            </Routes>
        </Router>
    );
}

export default App;
