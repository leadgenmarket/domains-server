import React, { useState, useEffect } from "react"
import CheckBoxItem from "./checkbox-item"
import ColoredScrollbars from "../colored-scrollbars/colored-scrollbars";

const TextStep = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
    const [raionsAvailable, setAvailableRaions] = useState([])
    const amIChecked = (answer) => {
        return form[step.title].split("; ").includes(answer)
    }

    const updateCheck = (answer) => {
        console.log(answer)
        if (amIChecked(answer)) {
            unsetAnswer(answer)
        } else {
            setAnswer(answer)
        }
    }

    const setAnswer = (answerIn) => {
        let answers = form[step.title].split("; ")

        if (answers[0] == "") {
            answers.splice(0, 1)
        }
        answers.push(answerIn)



        setForm((prev) => {
            let newForm = {}
            for (let i in prev) {
                newForm[i] = prev[i]
            }
            newForm[step.title] = answers.join("; ")
            return newForm
        })
    }

    const unsetAnswer = (answerOut) => {
        let answers = form[step.title].split("; ")
        if (answers[0] == "") {
            answers.splice(0, 1)
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
            newForm[step.title] = answers.join("; ")
        } else {
            newForm[step.title] = ""
        }
        setForm(newForm)
    }

    const updateCheckAll = () => {
        if (!amIChecked("Все")) {
            setAllRaions()
        } else {
            unsetAllRaions()
        }
    }

    const setAllRaions = () => {
        let newForm = {}
        for (let i in form) {
            newForm[i] = form[i]
        }
        newForm[step.title] = "Все, " + domainSettings.locations.map((location) => location.NameFull).join("; ")
        setForm(newForm)
    }

    const unsetAllRaions = () => {
        let newForm = {}
        for (let i in form) {
            newForm[i] = form[i]
        }
        newForm[step.title] = ""
        setForm(newForm)
    }


    if (step.type == "raions") {
        return <ColoredScrollbars style={{ backgroundColor: "transparent", width: "100%", height: 300 }}>
            <ul className="check_list_one check_list" id="kv_list">
                <CheckBoxItem key={"Все"} checked={amIChecked("Все")} updateCheck={updateCheckAll} answer={"Все"} step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />
                {domainSettings.locations.map((location) => {
                    return <CheckBoxItem key={location.NameFull} checked={amIChecked(location.NameFull)} updateCheck={updateCheck} answer={location.NameFull} step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />
                })}
            </ul>
        </ColoredScrollbars>
    }
    return <ul className="check_list_one check_list" id="kv_list">
        {step.answers.map((answer) => {
            return <CheckBoxItem checked={amIChecked(answer)} updateCheck={updateCheck} key={answer} answer={answer} step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />
        })}
    </ul>
}

export default TextStep