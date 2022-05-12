import React, { useContext } from "react";

import { ScoreContext } from "../context/Contexts";

const Result = () =>{
    const contextScore = useContext(ScoreContext)
    console.log(contextScore);
    return (
        <h1>Your result is {contextScore.score}/10</h1>
    )
}

export default Result;