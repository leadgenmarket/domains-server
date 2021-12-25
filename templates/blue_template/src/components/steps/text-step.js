import React from "react"
import CheckBoxItem from "./checkbox-item"

const TextStep = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
    return <ul className="check_list_one check_list" id="kv_list">
        {step.answers.map((answer) => {
            return <CheckBoxItem key={answer} answer={answer} step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} />
        })}
    </ul>
}

export default TextStep