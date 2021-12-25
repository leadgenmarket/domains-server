import React,{  useEffect, useState } from "react"
import CityTitle from "../city-title"
import { withStyles } from "@mui/styles";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import BtnComponent from "../btn-component";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Step = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
    const valuetext = (value) => {
        return `${value} руб.`;
    }

    const [sliderValue, setValue] = useEffect(0)
    const min = parseFloat(step.from)
    const max = parseFloat(step.to)
    const defaultValue = ((max - min)/4)+min
    
    const stepS = parseFloat(step.step)
    const handleChange = (event, newValue) => {
        setValue(newValue)
        form[step.title] = newValue
        setForm(form)
    };
    
    useEffect(()=> {
      if (form[step.title] === undefined && step.type == "slider") {
        form[step.title] = defaultValue
        setValue(defaultValue)
        setForm(form)
      }
    },[step])
    const sliderTheme = createTheme({
        overrides: {
          MuiSlider: {
            root: {
                color: `#${params.secondary_color} !important`,
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

    const theme = createTheme({
        overrides: {
          MuiCheckbox: {
            colorSecondary: {
              color: '#FFF',
              '&$checked': {
                color: 'FFF',
              },
            },
          },
        },
    });
    const CheckboxWithGreenCheck = withStyles({
    root: {
        "&:hover": {
            backgroundColor: "transparent"
          },
      "&$checked": {
          
        "& .MuiIconButton-label": {
          position: "relative",
          zIndex: 0,
          color: "#fff",
        },
        
        "& .MuiIconButton-label:after": {
            color: "#fff",
          content: '""',
          left: 4,
          top: 4,
          height: 15,
          width: 15,
          position: "absolute",
          backgroundColor: `#${params.main_color}`,
          zIndex: -1
        }
      }
    },
    checked: {}
  })(Checkbox);

  const checkChange = (event, flag) => {    
    if (flag) {
      setAnswer(event.target.value)
    } else {
      unsetAnswer(event.target.value)
    }
  }

  const setAnswer = (answerIn) => {
    if (form[step.title] != undefined && form[step.title] != "") {
      let answers = form[step.title].split(", ")
      let exists = false
      answers.forEach((answer) => {
        if (answer == answerIn) {
          exists = true
        }
      })
      if (!exists) {
        answers.push(answerIn)
      }
      form[step.title] = answers.join(", ")
    } else {
      form[step.title] = answerIn
    }
    setForm(form)
  }

  const unsetAnswer = (answerOut) => {
    let answers = form[step.title].split(", ")
    for (var key in answers) {
      if (answers[key] === answerOut) {
        answers.splice(key, 1);
      }
    }
   
    if (answers.length != 0) {
      form[step.title] = answers.join(", ")
    } else {
      delete form[step.title]
    }
    setForm(form)
  }

  const checkIfChecked = (answerCh) => {
    console.log(form[step.title])
    if (typeof form[step.title] !== String) {
      return false
    } else {
      let answers = form[step.title].split(", ")
      let isset = false
      answers.forEach((answer) => {
        if (answer === answerCh) {
          isset = true
        }
      })
      return isset
    }
  }

    
    
    return (<div style={{ display: "block" }} className="page_main pages ">
        <div class="page">
            <div class="page_inner">
                <div class="wmain">
                    <CityTitle params={params} index={index} length={length} />
                    <div class="title_inner title_room">{step.title}</div>
                    {step.type == "text" ? <ul class="check_list_one check_list" id="kv_list">
                        {step.answers.map((answer) => {
                            return <div style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
                                <ThemeProvider theme={theme}>
                                  <CheckboxWithGreenCheck defaultChecked={checkIfChecked(answer)} onChange={checkChange} value={answer} /><span>{answer}</span>
                                </ThemeProvider>
                                </div>
                        })}
                    </ul> : <div class="in_slider">
                        <div class="prpp" style={{ background: `#${params.secondary_color}` }} id="price_info">{form[step.title]===min?"От":"До"} {form[step.title] !==undefined ?form[step.title].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "):"0"} руб.</div>
                        <input id="max_price" type="hidden" value={valuetext} />
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
                                color="default"
                            />
                        </ThemeProvider>
                    </div>}
                    <div class="btn_block">
                        {index > 1 ? <BtnComponent text={"Назад"} params={params} clickFunct={prevStep}/> : ""}
                        <BtnComponent text={"Дальше"} params={params} clickFunct={nextStep}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}





export default Step