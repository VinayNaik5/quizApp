import React, { useContext, useEffect, useState} from "react";
import Axios from "axios";
import { ScoreContext } from "../context/Contexts";
import {useNavigate} from "react-router-dom";
import { Grid, Container, Typography } from "@mui/material"
import {decode} from "html-entities"
import Header from "./Header";

//stylings 

import QuestionTheme from "../customTheme/CustomTheme_queston";
import { ThemeProvider } from "@mui/material/styles";
//import { palette } from "@mui/system";

const Questions = () =>{
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(-1);
    const context = useContext(ScoreContext);
    const [options, setOptions] = useState([]);


    useEffect(()=>{
        getQuestions();
    },[])

    useEffect ( () => {
        setIndex(0);
        updateOptions()
    },[questions])

    useEffect( () =>{
        if (index !== null && index !== 0){
            updateOptions()
        }
    },[index])
    
    

    const Redirect =()=>{
        const navigate = useNavigate();
        useEffect( () =>{
            navigate("/Result")
        })
        return null
    }


    const updateOptions = () =>{
        setOptions([])
        setOptions([questions[index]?.correct_answer,...questions[index]?.incorrect_answers ?? []].sort( ()=>Math.random()-0.5 ))
        //console.log(questions[index]?.correct_answer,questions[index]?.incorrect_answers);
    }

    const getQuestions = async () =>{
        let {data} = await Axios.get("https://opentdb.com/api.php?amount=10");
        await setQuestions(data.results)
        console.log(data.results);
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
        
        <Container maxWidth='md' >
            <ThemeProvider theme={QuestionTheme} >
                <Header> 
                    <Typography>
                        Quiz App
                    </Typography>
                </Header>
                
                
                <Container>
                    <Container>
                        <div>
                            <h1>Question {index+1}</h1>
                        </div>
                        <div>
                            <h2><p>{decode(questions[index]?.question)} </p> </h2>
                        </div>
                    </Container>
                
                
                    <Container>
                        <Grid container columns={{md: 9, xs: 9, ld:9  }} spacing = {{md: 3,xs: 3, ld:3}}>
                            {
                                options.map((option,key) =>{
                                    return(
                                        <Grid item md = {4.5} className="" key={key}>
                                            <button className="btn-size" key={key} onClick={ (e) => compareAnswer(e.target.value)} value={option}>{decode(option)}</button>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Container>
                </Container>
            </ThemeProvider>
        </Container>
    )
}


export default Questions;