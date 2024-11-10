import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Popup({}) {
    const [problem, setProblem] = useState("");
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState("");
    const [numbers, setNumbers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMathProblem = async () => {
            const problem = generateRandomMathProblem();
            console.log(problem)
            const apiKey = process.env.REACT_APP_WOLFRAM_ALPHA_API_KEY; // Your Wolfram Alpha API Key
            const wolframUrl = `http://api.wolframalpha.com/v1/conversation.jsp?appid=${apiKey}&i=${problem}`;

            // try {
            //     console.log(wolframUrl);
            //     const pods = response.data.queryresult.pods;
            //     let solution = '';

            //     // Extract solution from the pods (Wolfram Alpha response format)
            //     pods.forEach(pod => {
            //         if (pod.title === 'Solution') {
            //             solution = pod.subpods[0].plaintext;
            //         }
            // //     });

            //     setProblem(problem);
            //     setCorrectAnswer(solution);
            // } catch (error) {
            //     console.error("Error fetching from Wolfram Alpha:", error);
            // }
        };

        fetchMathProblem();
      
        // const num1 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        // const num2 = Math.floor(Math.random() * (999 - 103 + 1)) + 103;
        // setNumbers([num1, num2]);
        // setProblem(`${num1} * ${num2 + ' = '}`);
        // setCorrectAnswer(num1 * num2);

        // if (audioRef.current) {
        //     audioRef.current.play().catch((error) => {
        //         console.error("Error playing audio:", error);
        //     });
        // }
    }, []);

    const generateRandomMathProblem = () => {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        return `${num1} ${operator} ${num2}`;
    };


    const handleChange = (e) => {
        setAttempt(e.target.value);
    };

    const handleSubmit = () => {
        if (parseInt(attempt) === correctAnswer) {
          navigate('/alarmclock');
        }
    };

    return (
        // <div>
        //     {error && <div style={{ color: 'red' }}>{error}</div>}
        //     <div>{response ? JSON.stringify(response) : 'Getting response ...'}</div>
        // </div>
    
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
