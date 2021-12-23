import { Input } from "@material-ui/core"
import React from "react"
import InputMask from 'react-input-mask'
import BtnComponent from "../btn-component"

const PhoneStep = ({params, nextStep}) => {
    const inputChange = () => {

    }
    return <React.Fragment>
                <div class="title_inner">Подобрано <b style={{color:`#${params.main_color}`}}>135 вариантов</b> по вашим параметрам. Есть предложения с выгодными акциями и скидками!</div>
                <div class="block_phone">
                    <div class="bp_title">Для получения доступа к базе укажите свой номер телефона</div>
                        <div class="bp_inner">
                            <form>
                                <InputMask mask="+7\ (999) 999-99-99" name="phone" onChange={inputChange} maskChar={null} >
                                    {(inputProps) => <input className="in_phone" {...inputProps} placeholder="+7 ( ___ ) ___ - __ - __" />}
                                </InputMask>
                                <BtnComponent text={"Посмотреть предложения"} params={params} clickFunct={nextStep} analog={true}/>
                            </form>
                        </div>
                    <span class="sp_err" id="err_phone"></span>
                </div>
            </React.Fragment>
}

export default PhoneStep