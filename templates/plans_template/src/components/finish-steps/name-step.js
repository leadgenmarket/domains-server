import React, { useEffect, useState } from "react"
import { SendData } from "../../utils"
import BtnComponent from "../btn-component"
import "./name-step.css"

const NameStep = ({ params, nextStep, form, setForm, raionsStep, roomsStep, sdachaName }) => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const inputChange = (event) => {
        setName(event.target.value)
        setForm({
            ...form,
            name: event.target.value
        })
    }

    useEffect(() => {
        if (form.name !== "" && form.name !== undefined) {
            setName(form.name)
        }
    }, [])

    const continueClick = (event) => {
        event.preventDefault()
        if (name.length !== 0) {
            setError(false)
            SendData(form, setForm, () => nextStep(event), raionsStep, roomsStep, sdachaName, "getName")
        } else {
            setError(true)
        }
    }

    return (<React.Fragment>
        <div className="title_inner">Как вас зовут?</div>
        <form class="form_main" onsubmit="return false;" action="/local/ajax/">
            <div class="form_sub">Ваше Имя</div>
            <input className={error ? "err" : ""} onChange={inputChange} type="text" value={name} />

            <BtnComponent text={"Получить подборку"} params={params} clickFunct={continueClick} analog={true} />
        </form>

    </React.Fragment>)
}

export default NameStep