import React, { useEffect, useState } from "react"
import InputMask from 'react-input-mask'
import { SendData } from "../../utils"
import BtnComponent from "../btn-component"

const PhoneStep = ({ params, nextStep, form, setForm, raionsStep, roomsStep, sdachaName }) => {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)
    const inputChange = (event) => {
        let value = event.target.value

        if (value.length > 4 && value.slice(0, 5) != "+7 (9") {
            value = "+7 ("
        }
        setPhone(value)
        setForm({
            ...form,
            phone: value
        })
    }

    useEffect(() => {
        if (form.phone !== "" && form.phone !== undefined) {
            setPhone(form.phone)
        }
    }, [])

    const continueClick = (event) => {
        event.preventDefault()
        if (phone.length === 18) {
            setError(false)
            SendData(form, setForm, () => nextStep(event), raionsStep, roomsStep, sdachaName, "getForm")
        } else {
            setError(true)
        }
    }
    return <div className="data_step m_step variants_step viewed act">
        <div class="ms_title">Подобрано 135 вариантов <br /> по вашим параметрам</div>
        <div class="sale_text"><img src="img/sale_tit.png" alt="" /><span>есть варианты со скидками <br /> и спецпредложениями</span></div>
        <form className="form_main">
            <span>Для получения доступа к базе укажите свой номер телефона</span>
            <InputMask mask="+7\ (999) 999-99-99" name="phone" value={phone} onChange={inputChange} maskChar={null} >
                {(inputProps) => <input className={error ? "form_phone ym-record-keys err" : "form_phone ym-record-keys"}  {...inputProps} placeholder="+7 ( ___ ) ___ - __ - __" />}
            </InputMask>
            <BtnComponent text={"Посмотреть предложения"} params={params} clickFunct={continueClick} analog={true} />
            <span className="sp_err" id="err_phone"></span>
        </form>
    </div>
}

export default PhoneStep