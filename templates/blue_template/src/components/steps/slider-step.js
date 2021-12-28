import React,{  useEffect, useState } from "react"
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";

const SliderStep = ({ step, params, raionsStep, roomsStep, index, length, nextStep, prevStep, form, setForm }) => {
    const [sliderValue, setValue] = useState(null)
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)
    const [defaultValue, setDefaultValue] = useState(null)

    const valuetext = (value) => {
        return `${value} руб.`;
    }

    const stepS = parseFloat(step.step)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        form[step.title] = newValue
        setForm(form)
    };

    const getRaionsID = (raionName) => {
        for (let i=0; i<domainSettings.locations.length; i++) {
            if (domainSettings.locations[i].NameFull === raionName) {
                return domainSettings.locations[i].PortalID
            }
        }
    }
    useEffect(()=> {
        if (step.type === "slider_r") {
            let minV
            let maxV
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
                console.log("надо взять значения по умолчанию, для всех районов")
            } else {
                console.log("считаем нужные районы и цены")
                let prices = []
               
                raions.forEach((raion) => {
                    prices.push(domainSettings.prices.prices[getRaionsID(raion)])
                })
                console.log(prices)
                
                
                prices.forEach((price) => {
                    typedRoomsMin.forEach((filed) => {
                        if (minV === undefined || minV > parseFloat(price[filed])) {
                            minV = Math.round(parseFloat(price[filed]))
                        }
                    })
                    typedRoomsMax.forEach((filed) => {
                        if (maxV === undefined || maxV < parseFloat(price[filed])) {
                            maxV = Math.round(parseFloat(price[filed]))
                        }
                    })
                })
                console.log(Math.round(min))
                //вот тут вопрос, наверное если слишком маленький интервал, то умножать на два
                //maxV = minV*2
                setMin(minV*1000000)
                setMax(maxV*1000000)
                setValue((((maxV - minV)/4)+minV)*1000000)
            }
           
            /*setMin(1500000)
            setMax(5500000)
            setDefaultValue(((1500000 - 5500000)/4)+1500000)*/
        } else {
            let minV = parseFloat(step.from)
            let maxV = parseFloat(step.to)
            setMin(minV)
            setMax(maxV)
            setValue(((maxV - minV)/4)+minV)
        }
    },[index])

   

    const sliderTheme = createTheme({
        overrides: {
          MuiSlider: {
            root: {
                //color: `#${params.secondary_color} !important`,
                height: 3,
                padding: "13px 0",
                marginTop: "-21px",
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

    if (min==null || max == null || sliderValue == null) {
        return <div>load</div>
    }

  return <div className="in_slider">
            <div className="prpp" style={{ background: `#${params.secondary_color}` }} id="price_info">{sliderValue===min?"От":"До"} {sliderValue !==undefined ?sliderValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "):"0"} руб.</div>
            <input id="max_price" type="hidden" value={valuetext()} />
            <ThemeProvider theme={sliderTheme}>
                <Slider 
                    //defaultValue={defaultValue}
                    getAriaValueText={valuetext}
                    aria-labelledby="non-linear-slider"
                    step={10000}
                    value={sliderValue}
                    onChange={handleChange}
                    min={min}
                    max={max}
                />
            </ThemeProvider>
        </div>
}

export default SliderStep