import React, { useContext, useEffect, useState} from "react";
import Axios from "axios";
import { ScoreContext } from "../context/Contexts";
import {useNavigate} from "react-router-dom";



const Questions = () =>{
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(-1);
    const context = useContext(ScoreContext);


    useEffect(()=>{
        getQuestions();
        setIndex(0);
    },[])

    const Redirect =()=>{
        const navigate = useNavigate();
        useEffect( () =>{
            navigate("/Result")
        })
        return null
    }



    const getQuestions = async () =>{
        const {data} = await Axios.get("https://opentdb.com/api.php?amount=10");
        await setQuestions(data.results)
    }
    
    const compareAnswer= (option) =>{
        
        if (option === questions[index]?.correct_answer){
            context.setScore(context.score+1)
        }   
        if (index<9 ){
            setIndex(index+1)           
        }
        else{
            setIndex(null)
        }
    }

    if (index === null){
        return(
            <Redirect/>
        )
    }
    
    return(
        <div>
                <h1>Question {index+1}</h1>
                <h2>{questions[index]?.question} </h2>
                <button onClick={(e) => compareAnswer(e.target.value)} value={questions[index]?.correct_answer}>{questions[index]?.correct_answer}</button>
                {
                    
                    questions[index]?.incorrect_answers.map((option,key)=>{
                        return (
                            <button key= {key} onClick={(e) => compareAnswer(e.target.value)} value={option}>{option}</button>
                        )
                    })
                }

                {/* {
                    options.map((option,key) =>{
                        return(
                            <button key={key} onClick={ (e) => compareAnswer(e.target.value)} value={option}>{option}</button>
                        )
                    })
                } */}
        </div>
    )

}


export default Questions;