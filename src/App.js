import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alarm from './Alarm';
import Popup from './Popup';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Alarm />} />  {/* Home page */}
                <Route path="/popup" element={<Popup />} />  {/* Popup page */}
            </Routes>
        </Router>
    );
}

export default App;
