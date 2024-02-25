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

    function calculateResults() {

    }

    return (
        <div>
            {QuizBank.length > 0 && currentQuestionId < QuizBank.length && (
                <div>
                    <p>{QuizBank[currentQuestionId].question}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {QuizBank[currentQuestionId].answers.map((answer, index) => (
                            <div key={index} style={{ textAlign: 'center' }}>
                                <div
                                    onClick={() => handleAnswerClick(answer.value)}
                                    style={{
                                        width: answer.size === 'large' ? '30px' : '15px',
                                        height: answer.size === 'large' ? '30px' : '15px',
                                        borderRadius: '50%',
                                        backgroundColor: '#007bff',
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    }}
                                ></div>
                                {answer.label && <div>{answer.label}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;