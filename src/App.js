import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlarmApp from './AlarmApp'; // Main alarm app page
import PopupPage from './PopupPage'; // New page with the math problem

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AlarmApp />} />  {/* Home page */}
                <Route path="/popup" element={<PopupPage />} />  {/* Popup page */}
            </Routes>
        </Router>
    );
}

export default App;
