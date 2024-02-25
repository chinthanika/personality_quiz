import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QuizBank from './components/QuizBank';

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

    function calculateResults () {

    }

    return (
        <div>
            {QuizBank.length > 0 && currentQuestionId < QuizBank.length && (
                <div>
                    <p>{QuizBank[currentQuestionId].question}</p>
                    {QuizBank[currentQuestionId].answers.map((answer, index) => (
                        <button key={index} onClick={() => handleAnswerClick(answer)}>
                            {answer}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;