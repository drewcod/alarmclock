import React, { useState, useEffect, useCallback } from "react";
import * as GoogleGenerativeAI from '@google/generative-ai';
const WolframAlphaAPI = require('wolfram-alpha-api');


const model = new GoogleGenerativeAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
const waApi = WolframAlphaAPI(process.env.REACT_APP_WA_API_KEY); 

function Popup({ children, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [attempt, setAttempt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newProblem = await model.generateText('generate a calculus problem for wolfram alpha api to solve');
        setProblem(newProblem);
        
        const wolframAnswer = await waApi.getShort(newProblem);
        setCorrectAnswer(parseFloat(wolframAnswer));
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred. Please try again later.");
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [onClose]);

  const handleChange = (e) => {
    setAttempt(e.target.value);
  };

  const handleSubmit = () => {
    if (parseFloat(attempt) === correctAnswer) {
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
              disabled={isLoading} 
            />
            <button onClick={handleSubmit} disabled={isLoading}>
              Submit
            </button>
            {attempt && parseFloat(attempt) !== correctAnswer && (
              <p>Wrong Answer!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
