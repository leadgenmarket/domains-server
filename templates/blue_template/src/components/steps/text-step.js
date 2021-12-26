import React, {useState, useEffect} from "react"
import CheckBoxItem from "./checkbox-item"
import ColoredScrollbars from "../colored-scrollbars/colored-scrollbars";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const TextStep = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
    const [checked, setCheckedList] = useState([])
    const amIChecked = (answer) => {
       return checked.includes(answer)
    }

    const updateCheck = (answer) => {
        if (!checked.includes(answer)) {
            setCheckedList((prevState)=>{
                let newState = []
                prevState.forEach((item) => {
                    if (item != answer) {
                        newState.push(item)
                    }
                })
                return newState
            })
            setAnswer(answer)
        } else {
            setCheckedList((prevState) => {
                //let newState = Array.from(prevState)
                prevState.push(answer)
                return prevState
            })
            unsetAnswer(answer)
        }
    }

    const getList = () => {
        if (typeof form[step.title] !== "string") {
            setCheckedList([])
        } else { 
            setCheckedList(form[step.title].split(", "))
        }
    }

    useEffect(() => {
        getList()
    }, [index, form])


    const setAnswer = (answerIn) => {
        let answers = form[step.title].split(", ")
        if (answers[0] == "") {
            answers.splice(0,1)
        }
        answers.push(answerIn)
        let newForm = {}
        for (let i in form) {
            newForm[i] = form[i]
        }
        newForm[step.title] = answers.join(", ")
        setForm(newForm)
    }
        
    const unsetAnswer = (answerOut) => {
        let answers = form[step.title].split(", ")
        if (answers[0] == "") {
            answers.splice(0,1)
        }
        for (var key in answers) {
            if (answers[key] === answerOut) {
                answers.splice(key, 1);
            }
        }
        let newForm = {}
        for (let i in form) {
            newForm[i] = form[i]
        }
        if (answers.length !== 0) {
            newForm[step.title] = answers.join(", ")
        } else {
            delete newForm[step.title]
        }
        setForm(newForm)
    }

    if (step.type == "raions") {
        return <ColoredScrollbars style={{ backgroundColor:"transparent", width: "100%", height: 300 }}>
                <ul className="check_list_one check_list" id="kv_list">
                    <CheckBoxItem key={"Все"} checked={amIChecked("Все")} updateCheck={updateCheck} answer={"Все"} step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} /> 
                    {domainSettings.locations.map((location) => {
                        return <CheckBoxItem checked={amIChecked(location.NameFull)} updateCheck={updateCheck} key={location.NameFull} answer={location.NameFull} step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} />
                    })}
                </ul>
            </ColoredScrollbars>
    }
    return <ul className="check_list_one check_list" id="kv_list">
        {step.answers.map((answer) => {
            return <CheckBoxItem checked={amIChecked(answer)} updateCheck={updateCheck} key={answer} answer={answer} step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} />
        })}
    </ul>
}

export default TextStep