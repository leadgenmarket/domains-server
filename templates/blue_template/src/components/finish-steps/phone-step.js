import React, { useEffect, useState } from "react"
import InputMask from 'react-input-mask'
import { SendData } from "../../utils"
import BtnComponent from "../btn-component"

const PhoneStep = ({params, nextStep, form, setForm, raionsStep, roomsStep, sdachaName}) => {
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)
    const inputChange = (event) => {
        setPhone(event.target.value)
        setForm({
            ...form,
            phone: event.target.value
        })
    }

    useEffect(()=>{
        if (form.phone!=="" && form.phone!==undefined) {
            setPhone(form.phone)
        }
    },[])

    const continueClick = (event) =>{
        event.preventDefault()
        if (phone.length === 18) {
            setError(false)
            SendData(form, setForm, () => nextStep(event), raionsStep, roomsStep, sdachaName, "getForm")
        } else {
            setError(true)
        }
    } 
    return <React.Fragment>
                <div className="title_inner">Подобрано <b style={{color:`#${params.main_color}`}}>135 вариантов</b> по вашим параметрам. Есть предложения с выгодными акциями и скидками!</div>
                <div className="block_phone">
                    <div className="bp_title">Для получения доступа к базе укажите свой номер телефона</div>
                        <div className="bp_inner">
                            <form>
                                <InputMask mask="+7\ (999) 999-99-99" name="phone" value={phone} onChange={inputChange} maskChar={null} >
                                    {(inputProps) => <input className={error?"in_phone ym-record-keys err":"in_phone ym-record-keys"}  {...inputProps} placeholder="+7 ( ___ ) ___ - __ - __" />}
                                </InputMask>
                                <BtnComponent text={"Посмотреть предложения"} params={params} clickFunct={continueClick} analog={true}/>
                            </form>
                        </div>
                    <span className="sp_err" id="err_phone"></span>
                </div>
            </React.Fragment>
}

export default PhoneStep