import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from '@google/generative-AI';
const WolframAlphaAPI = require('wolfram-alpha-api');

function Popup({ children, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [attempt, setAttempt] = useState("");
  const model = new GoogleGenerativeAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
  const waApi = WolframAlphaAPI('EXYQVE-AWYTW7QVLP');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newProblem = await model.generateText('generate a calculus problem for wolfram alpha api to solve');
        setProblem(newProblem);
        const wolframAnswer = await waApi.getShort(newProblem);
        setCorrectAnswer(wolframAnswer);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred. Please try again later.");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
        {isLoading ? (
          <p>Loading problem...</p>
        ) : (
          <>
            <p>{problem}</p>
            <input
              type="number"
              value={attempt}
              onChange={handleChange}
              placeholder="Enter your answer"
              disabled={isLoading} // Disable button while loading
            />
            <button onClick={handleSubmit} disabled={isLoading}>
              Submit
            </button>
            {attempt && parseInt(attempt) !== correctAnswer && (
              <p>Wrong Answer!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;