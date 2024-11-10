import React, { useState } from "react";

function Popup({ children, onClose }) {
    const [attempt, setAttempt] = useState("");
    const [problem, setProblem] = useState('2 + 4 * -1 * (1 / 2) = ')
    // eslint-disable-next-lineconst 
    correctAnswer = 0;

    const handleChange = (e) => {
        setAttempt(e.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(attempt) === correctAnswer) {
            onClose();
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <>{problem}</>
                <input
                    type="number"
                    value={attempt}
                    onChange={handleChange}
                    placeHolder="Enter your answer"    
                />
                <button onClick={handleSubmit}>Submit</button>
                {attempt && parseInt(attempt) !== correctAnswer && <p>Wrong Answer!</p>}
            </div>
        </div>
    );
}

export default Popup;