import React, { useState } from "react";

function Popup({ children, onClose }) {
    const [attempt, setAttempt] = useState("");
    const[numbers, setNumbers] = useState([]);

    setNumbers(() => {
      var num1 = Math.random(103, 999);
      var num2 = Math.random(103, 999);
      return [num1, num2];
    });

    const [problem, setProblem] = useState(numbers[0] + ' * ' + numbers[1]);
    const correctAnswer = numbers[0] * numbers[1];

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