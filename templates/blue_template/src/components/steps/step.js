import React,{  useEffect, useState } from "react"
import CityTitle from "../city-title"
import { withStyles } from "@mui/styles";
import { Slider } from "@mui/material";

const Step = ({ step, params, index, length, nextStep, prevStep }) => {
    const valuetext = (value) => {
        return `${value} руб.`;
    }
    const [value, setValue] = useState(null)
    const min = parseFloat(step.from)
    const max = parseFloat(step.to)
    
    const stepS = parseFloat(step.step)
    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
          setValue(newValue);
        }
    };
    
    useEffect(()=> {
        setValue(((max - min)/4)+min)
    },[step])
    return (<div style={{ display: "block" }} className="page_main pages ">
        <div class="page">
            <div class="page_inner">
                <div class="wmain">
                    <CityTitle params={params} index={index} length={length} />
                    <div class="title_inner title_room">{step.title}</div>
                    {step.type == "text" ? <ul class="check_list_one check_list" id="kv_list">
                        {step.answers.map((answer) => {
                            return <li className="act"><span>{answer}</span></li>
                        })}
                    </ul> : <div class="in_slider">
                        <div class="prpp" style={{ background: `#${params.main_color}` }} id="price_info">{value===min?"От":"До"} {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</div>
                        <input id="max_price" type="hidden" value={valuetext} />
                        <CustomSlider
                            defaultValue={max-min}
                            getAriaValueText={valuetext}
                            aria-labelledby="non-linear-slider"
                            step={stepS}
                            value={value}
                            onChange={handleChange}
                            min={min}
                            max={max}
                        />
                    </div>}
                    <div class="btn_block">
                        {index > 1 ? <a onClick={prevStep} style={{ background: `#${params.main_color}` }} class="btn" href="#">Назад</a> : ""}
                        <a class="btn" style={{ background: `#${params.main_color}` }} onClick={nextStep}>Дальше</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


const CustomSlider = withStyles({
    root: {
        color: "#6f8eff",
        height: 3,
        padding: "13px 0",
        marginTop: "-15px",
    },
    track: {
        height: 4,
        borderRadius: 2,
        color:"white"
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginLeft: 0,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        color: "#fff",
    },
})(Slider);


export default Step