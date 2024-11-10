import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function PopupPage() {
    const [attempt, setAttempt] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [problem, setProblem] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const num1 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        const num2 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        setNumbers([num1, num2]);
        setProblem(`${num1} * ${num2 + ' = '}`);
        setCorrectAnswer(num1 * num2);
    }, []);

    const handleChange = (e) => {
        setAttempt(e.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(attempt) === correctAnswer) {
            // Navigate back to the home page after correct answer
            navigate("/"); // This will redirect to the home page
        } else {
            alert("Wrong Answer! Try again.");
        }
    };

    return (
        <div>
            <h1>Solve the Math Problem!</h1>
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
    );
}

export default PopupPage;
