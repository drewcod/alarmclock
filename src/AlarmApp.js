import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlarmApp() {
    const [alarmTime, setAlarmTime] = useState(null);
    const [attempt, setAttempt] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [problem, setProblem] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const navigate = useNavigate();

    const generateMathProblem = () => {
        const num1 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        const num2 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        setNumbers([num1, num2]);
        setProblem(`${num1} * ${num2 + ' = '}`);
        setCorrectAnswer(num1 * num2);
    };

    useEffect(() => {
        if (alarmTime) {
            const alarmTimeout = setTimeout(() => {
                generateMathProblem();
                alert(problem);
            }, alarmTime - Date.now());

            return () => clearTimeout(alarmTimeout);
        }
    }, [alarmTime, problem]);

    const handleChange = (e) => {
        setAttempt(e.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(attempt) === correctAnswer) {
            navigate("/");
        } else {
            alert("Wrong Answer! Try again.");
        }
    };

    const setAlarm = () => {
        const now = new Date();
        const alarmDate = new Date(now.getTime() + 5000);
        setAlarmTime(alarmDate);
        console.log(`Alarm set for: ${alarmDate}`);
        
    };

    return (
        <div>
            <h1>Alarm App</h1>
            <button onClick={setAlarm}>Set Alarm</button>
            {problem && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Solve the Math Problem!</h2>
                        <div>{problem}</div>
                        <input
                            type="number"
                            value={attempt}
                            onChange={handleChange}
                            placeholder="Enter your answer"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                        {attempt && parseInt(attempt) !== correctAnswer && <p>Wrong Answer!</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AlarmApp;
