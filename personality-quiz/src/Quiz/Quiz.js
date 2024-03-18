import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import QuizBank from '../components/QuizBank';
import './Quiz.css';

function Quiz() {
    let navigate = useNavigate();
    const [currentQuestionId, setCurrentQuestionId] = useState(0);

    // Effect for quiz bank
    //useEffect(() => {
    //    setCurrentQuestionId(0);
    //}, []);

    // Effect for loading external quiz script
    useEffect(() => {
        const scriptId = 'os-widget-jssdk';

        // Avoid duplicate script addition
        if (document.getElementById(scriptId)) {
            return;
        }

        // Create script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = scriptId;
        script.async = true;
        script.src = 'https://www.opinionstage.com/assets/loader.js?' + Math.floor(new Date().getTime() / 1000000);

        // Insert script in document
        document.body.appendChild(script);

        // Cleanup function to remove script when component unmounts
        return () => {
            const loadedScript = document.getElementById(scriptId);
            if (loadedScript) {
                loadedScript.remove();
            }
        };
    }, []);

    function calculateResults() {
        // Implementation of result calculation
    }

    return (
        <div className="quiz-container">
            {console.log("Running")}
            {/* Your existing quiz content here */}
            {/* Placeholder for the external quiz */}
            <div id="os-widget-1216415" className="os_widget" data-path="/phil18/-my-plant-personality" data-of="phil18" data-opinionstage-widget="0b23cc18-55c2-4707-aff1-fb362e285458"></div>
        </div>
    );
};

export default Quiz;