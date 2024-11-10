import React, { useState, useEffect, useRef } from 'react';

function Popup({ children, onClose }) {
    const [attempt, setAttempt] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [problem, setProblem] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const num1 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        const num2 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        setNumbers([num1, num2]);
        setProblem(`${num1} * ${num2 + ' = '}`);
        setCorrectAnswer(num1 * num2);

        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        }
    }, []);

    const handleChange = (e) => {
        setAttempt(e.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(attempt) === correctAnswer) {
            window.close();
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" style={{ display: 'none' }} />
                <>{problem}</>
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
    );
}

export default Popup;
