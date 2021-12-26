import React,{  useEffect, useState } from "react"
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";

const SliderStep = ({ step, params, raionsStep, roomsStep, index, length, nextStep, prevStep, form, setForm }) => {
    const [sliderValue, setValue] = useState(0)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const [defaultValue, setDefaultValue] = useState(0)

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
        let min = parseFloat(step.from)
        let max = parseFloat(step.to)
        setMin(min)
        setMax(max)
        setValue(((max - min)/4)+min)
        /*if (step.type === "slider_r") {
            let min
            let max
            let raions = form[raionsStep].split(", ")
            let typedRoomsMin = [];
            let typedRoomsMax = [];
            let rooms = form[roomsStep].split(", ")
            if (rooms.length == 1 && rooms[0] == "") {
                typedRoomsMin.push("min")
                typedRoomsMax.push("max")
            } else {
                if (rooms.includes("Студии")) {
                    typedRoomsMin.push("min_0")
                    typedRoomsMax.push("max_0")
                }
                if (rooms.includes("1 - комнатные квартиры")) {
                    typedRoomsMin.push("min_1")
                    typedRoomsMax.push("max_1")
                }
                if (rooms.includes("2 - комнатные квартиры")) {
                    typedRoomsMin.push("min_2")
                    typedRoomsMax.push("max_2")
                }
                if (rooms.includes("3 - комнатные квартиры")) {
                    typedRoomsMin.push("min_3")
                    typedRoomsMax.push("max_3")
                }
                if (rooms.includes("4 - комнатные квартиры")) {
                    typedRoomsMin.push("min_4")
                    typedRoomsMax.push("max_4")
                }
            }
            console.log(typedRoomsMin)
            console.log(typedRoomsMax)
            if (raions.length == 1 && raions[0] == "") {
                //console.log("надо взять значения по умолчанию, для всех районов")
                domainSettings.locations.forEach((location) => {
                    try {
                        let price = JSON.parse(location.Prices)
                        console.log(price)
                    } catch (e){}
                })
            } else {
                console.log("считаем нужные районы и цены")
            }
            setMin(1500000)
            setMax(5500000)
            setDefaultValue(((1500000 - 5500000)/4)+1500000)
        } else if (form[step.title] === undefined) {
          form[step.title] = defaultValue
          setValue(defaultValue)
          setForm(form)
        } else if (form[step.title]!== undefined && typeof form[step.title] === "number") {
            setValue(form[step.title])
        }*/
    },[index])

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
            <div className="prpp" style={{ background: `#${params.secondary_color}` }} id="price_info">{sliderValue===min?"От":"До"} {sliderValue !==undefined ?sliderValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "):"0"} руб.</div>
            <input id="max_price" type="hidden" value={valuetext()} />
            <ThemeProvider theme={sliderTheme}>
                <Slider 
                    defaultValue={defaultValue}
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