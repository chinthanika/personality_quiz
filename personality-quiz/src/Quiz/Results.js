import React from "react";
import { useParams } from "react-router-dom";

import PersonalityBank from "../components/PersonalityBank";

import "./Results.css";

function Results() {
    var personality = {};

    const { personalityType } = useParams();

    for (const personalityIndex in PersonalityBank) {

        if (PersonalityBank[personalityIndex].type === personalityType){
            personality = PersonalityBank[personalityIndex];
        }
    }

    return (
        <div className="ResultsContainer">
            <h1 className="header">Results</h1>
            <h2 className="personalityType">Personality Type: {personality.type}</h2>
            <h3 className="plantName">Your Plant: {personality.plant}</h3>
            <p className="meaning">{personality.meaning}</p>
        </div>
    );
}

export default Results;