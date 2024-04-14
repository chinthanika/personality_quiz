import React from "react";
import { useParams } from "react-router-dom";
import { ReactP5Wrapper } from 'react-p5-wrapper';

import PersonalityBank from "../components/PersonalityBank";

import "./Results.css";
import PlantSketch from "../components/PlantSketch";

function Results() {
    var personality = {};

    const { personalityType } = useParams();

    for (const personalityIndex in PersonalityBank) {

        if (PersonalityBank[personalityIndex].type === personalityType){
            personality = PersonalityBank[personalityIndex];
        }
    }

    return (
        <div className="resultsContainer">
            <h1 className="header">Results</h1>
            <h2 className="personalityType">Personality Type: {personality.type}</h2>
            <h3 className="plantName">Your Plant: {personality.plant}</h3>
            <p className="meaning">{personality.meaning}</p>

            <ReactP5Wrapper sketch={PlantSketch} />
        </div>
    );
}

export default Results;