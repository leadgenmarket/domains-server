import React, { useEffect, useState } from "react"
import { SendData } from "../../utils"
import BtnComponent from "../btn-component"

const NameStep = ({params, nextStep, form, setForm}) => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const inputChange = (event) => {
        setName(event.target.value)
        setForm({
            ...form,
            name: event.target.value
        })
    }

    useEffect(()=>{
        if (form.name!=="" && form.name!==undefined) {
            setName(form.name)
        }
    },[])

    const continueClick = (event) =>{
        event.preventDefault()
        if (name.length !== 0) {
            setError(false)
            SendData(form, setForm, () => nextStep(event))
        } else {
            setError(true)
        }
    }

    return(<React.Fragment>
            <div className="title_inner">Как вас зовут?</div>
            <div className="block_phone">
                <div className="bp_title">Ваше имя</div>
                <div className="bp_inner">
                    <form>
                        <input className={error?"err":""} onChange={inputChange} type="text" value={name} />
                        <BtnComponent text={"Получить подборку"} params={params} clickFunct={continueClick} analog={true}/>
                    </form>
                </div>
            </div>
    </React.Fragment>)
}

export default NameStep