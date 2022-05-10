import React, {useEffect, useState} from "react";
import Axios from "axios";
import axios from "axios";

const Questions = () =>{
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () =>{
        const {data} = await Axios.get("https://opentdb.com/api.php?amount=10");
        setQuestions(data.results)
    }
    
    useEffect(()=>{
        getQuestions();
    },[])

    
    return(
        <div>
            <h1>Question and options</h1>
            {
                questions.map( (question, index ) => {
                    return (
                        <div>
                            <div>
                                <h2>Question No {index+1}</h2>
                                <div>
                                    <h3>{question.question}</h3>
                                </div>
                                <div>
                                    <h4>{question.correct_answer}</h4>
                                </div>
                                <div>
                                    <h4>{
                                        question.incorrect_answers.map((icoptions) => {
                                            return (
                                                <div>
                                                    <h4>{icoptions}</h4>
                                                </div>
                                            )
                                        })
                                        }
                                    </h4>
                                </div>
                            </div>
                        </div>
                    )   
                })
            }
        </div>
    )

}


export default Questions;
