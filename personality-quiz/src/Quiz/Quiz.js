import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import PlantSketch from '../components/PlantSketch';

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
            const personalityType = calculateResults();
            navigate(`/results/${personalityType}`);
        }

    }

    function calculateResults() {
        const attributes = {
            EI: 2.0,  // Extroversion / Introversion
            SN: 2.0,  // Sensing / Intuition
            TF: 2.0   // Thinking / Feeling
        };
    
        const weights = {1: -1.0, 2: -0.5, 3: 0.6, 4: 0.9};  // Weights for each answer

        console.log(selectedAnswers)
    
        selectedAnswers.forEach((answer, i) => {
            const setIndex = Math.floor(i / 3);  // Determine the question set (0, 1, 2)
    
            let attribute;
            if (setIndex === 0) {
                attribute = "EI";
            } else if (setIndex === 1) {
                attribute = "SN";
            } else {  // setIndex === 2
                attribute = "TF";
            }
    
            // Apply weight
            attributes[attribute] += weights[answer];
            // Ensure the score is within 0 and 4
            attributes[attribute] = Math.max(0, Math.min(attributes[attribute], 4));
        });
    
        let personalityType = "";
        for (const attribute in attributes) {
            if (attributes[attribute] >= 2.0) {
                personalityType += attribute[0];  // Add E, S, or T
            } else {
                personalityType += attribute[1];  // Add I, N, or F
            }
        }
    
        console.log("Your personality type is:", personalityType);

        return personalityType;
    }

    return (
        <div className="quiz-container">
            
            <p>{QuizBank[currentQuestionId].question}</p>
            {QuizBank.length > 0 && currentQuestionId < QuizBank.length && (
                <div className = "answers-container">
                    {QuizBank[currentQuestionId].answers.map((answer, index, array) => (
                        <div key = {index} style = {{ display: 'flex', alignItems: 'center' }}> {/* Ensure alignment */}
                            {/* Conditionally render label for the first answer */}
                            {index === 0 && <div className="circle-label" style = {{ marginRight: '10pt' }}>{answer.label}</div>}
                            <div
                                className = {`circle ${answer.size}`}
                                onClick = {() => handleAnswerClick(answer.value)}
                            ></div>
                            {/* Conditionally render label for the last answer */}
                            {index === array.length - 1 && <div className = "circle-label" style = {{ marginLeft: '10pt' }}>{answer.label}</div>}
                        </div>
                    ))}
                </div>
            )
            }
            <ReactP5Wrapper sketch={PlantSketch} />
        </div >
    );
};

export default Quiz;