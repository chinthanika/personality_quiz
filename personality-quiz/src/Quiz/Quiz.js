import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QuizBank from '../components/QuizBank';

import './Quiz.css';

function Quiz() {

    let navigate = useNavigate();
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        setCurrentQuestionId(0);

        setSelectedAnswers([]);
    }, [])

    function handleAnswerClick(answer) {
        console.log("Answer selected:", answer);

        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionId] = answer;
        setSelectedAnswers(newSelectedAnswers);

        if (currentQuestionId < QuizBank.length - 1) {
            setCurrentQuestionId(currentQuestionId + 1);
        }
        else {
            calculateResults();
            navigate('/results');
        }

    }

    function calculateResults() {

    }

    return (
        <div className="quiz-container">
            <p>{QuizBank[currentQuestionId].question}</p>
            {QuizBank.length > 0 && currentQuestionId < QuizBank.length && (
                <div className="answers-container">
                    {QuizBank[currentQuestionId].answers.map((answer, index, array) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}> {/* Ensure alignment */}
                            {/* Conditionally render label for the first answer */}
                            {index === 0 && <div className="circle-label" style={{ marginRight: '10pt' }}>{answer.label}</div>}
                            <div
                                className={`circle ${answer.size}`}
                                onClick={() => handleAnswerClick(answer.value)}
                            ></div>
                            {/* Conditionally render label for the last answer */}
                            {index === array.length - 1 && <div className="circle-label" style={{ marginLeft: '10pt' }}>{answer.label}</div>}
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default Quiz;