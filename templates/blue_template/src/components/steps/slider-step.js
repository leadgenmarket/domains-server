import React,{  useEffect, useState } from "react"
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";

const SliderStep = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
    const [sliderValue, setValue] = useState(0)
    const min = parseFloat(step.from)
    const max = parseFloat(step.to)
    const defaultValue = ((max - min)/4)+min

    const valuetext = (value) => {
        return `${value} руб.`;
    }

    const stepS = parseFloat(step.step)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        form[step.title] = newValue
        setForm(form)
    };

    useEffect(()=> {
        if (form[step.title] === undefined) {
          form[step.title] = defaultValue
          setValue(defaultValue)
          setForm(form)
        } else if (form[step.title]!== undefined && typeof form[step.title] === "number") {
            setValue(form[step.title])
        }
    },[step])

    const sliderTheme = createTheme({
        overrides: {
          MuiSlider: {
            root: {
                //color: `#${params.secondary_color} !important`,
                height: 3,
                padding: "13px 0",
                marginTop: "-15px",
            },
            track: {
                height: 4,
                borderRadius: 2,
                color:`#${params.main_color}`
            },
            thumb: {
                marginTop: "-20px",
                width: "46px !important",
                height: "46px !important",
                background: `#${params.secondary_color} !important`,
                cursor: "pointer",
                outlineStyle: "none",
                border: `2px solid #${params.main_color}`,
                webkitBoxSizing: "border-box",
                mozBoxSizing: "border-box",
                boxSizing: "border-box",
                webkitBorderRadius: "50%",
                borderRadius: "50%",
            }
          }
        }
    });

  return <div className="in_slider">
            <div className="prpp" style={{ background: `#${params.secondary_color}` }} id="price_info">{form[step.title]===min?"От":"До"} {form[step.title] !==undefined ?form[step.title].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "):"0"} руб.</div>
            <input id="max_price" type="hidden" value={valuetext()} />
            <ThemeProvider theme={sliderTheme}>
                <Slider 
                    //defaultValue={form[step.title]}
                    getAriaValueText={valuetext}
                    aria-labelledby="non-linear-slider"
                    step={stepS}
                    value={sliderValue}
                    onChange={handleChange}
                    min={min}
                    max={max}
                />
            </ThemeProvider>
        </div>
}

export default SliderStep