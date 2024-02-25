import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import QuizBank from './components/QuizBank';

function Quiz () {
    let navigate = useNavigate();
    const [currentQuestionId, setCurrentQuestionId] = useState("");
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect (() => {
        setCurrentQuestionId(QuizBank[0]);
        setSelectedAnswers([]);
    }, [])

    function handleAnswerClick (answer) {
        console.log ("Answer selected:", answer);

        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionId] = answer;
        setSelectedAnswers(newSelectedAnswers);

        if (currentQuestionId < QuizBank.length - 1) {
            setCurrentQuestionId(currentQuestionId + 1);
        } else {
            calculateResults();
            navigate('/results')
        }
    }

    return (
        <div>
            {QuizBank > 0 && currentQuestionId < QuizBank.length && (
                <div>
                    <p>{QuizBank}[currentQuestionId].answers.map((answer, index) => (
                        <button key = {index} onClick = {() = handleAnswerClick(answer)}>
                            {answer}
                        </button>
                    ))</p>
                </div>
            )}
        </div>
    );
};