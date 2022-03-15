import { useEffect, useRef, useState } from "react"
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import React from "react";



const DatePickerInput = ({name, json, value, enable}) => {
    const [date, setDate] =useState()
    const group = React.createRef();
    var startDate = new Date().toISOString().slice(0,10)
    const setToinput =(date) => {
        document.querySelectorAll('input[name="'+json+'"]').forEach(el => {
            let parsedDate = new Date(Date.parse(date))
            el.setAttribute('value',parsedDate.toISOString())
            let elem = group.current
            //setDate(date)
            setTimeout(()=> {
                elem.querySelector('input').setAttribute('value',parsedDate.toISOString())
            },200)
        })
        //setDate(date)
    }
    

    useEffect(() => {
        if(value !=undefined && value !=null && value.length>0) {
            let elem = group.current
            let parsedDate = new Date(Date.parse(value))
            setDate([parsedDate])

            setTimeout(()=> {
                elem.querySelector('input').setAttribute('value', value)
            }, 200)
        }
    }, [value])
    const option = () => {
        if (enable ===false) {
            return {"data-enable-time":true}
        }
    }
    return <React.Fragment>
                <label>{name}:</label>
                <div ref = {group} className="form-group">
                        {enable ===false?<Flatpickr
                            className="form-control flatpickr-inline flatpickr-input"
                            value={date}
                            name={json}
                            options={{
                                minDate: value.length==0?startDate:"",
                                locale: Russian }}
                            onChange={date => setToinput(date)}
                            />:
                            <Flatpickr
                                data-enable-time
                                className="form-control flatpickr-inline flatpickr-input"
                                value={date}
                                name={json}
                                options={{
                                    minDate: value.length==0?startDate:"",
                                    locale: Russian }}
                                onChange={date => setToinput(date)}
                            />
                        }
                        <div class="invalid-feedback">Проверьте правильность ввода поля.</div>
                </div>
            </React.Fragment>
}

export default DatePickerInput