import React, { useEffect, useState } from "react"
import { SendData } from "../../utils"
import BtnComponent from "../btn-component"

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

    return (<div className="data_step m_step name_step viewed act">
        <div class="ms_title">Как к Вам обращаться?</div>
        <form className="form_main">
            <input className={error ? "err" : ""} onChange={inputChange} type="text" value={name} placeholder="Введите Ваше имя" />
            <BtnComponent text={"Далее"} params={params} clickFunct={continueClick} analog={true} />
        </form>
    </div>)
}

export default NameStep