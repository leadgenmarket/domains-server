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
    console.log(flag)
    console.log(step.title+" : "+event.target.value)
    console.log('check changed')
    if (flag) {
      setAnswer(event.target.value)
    }
  }

  const setAnswer = (answer) => {
    //Object.keys(form).forEach((key) => {
      //if 
    //})
    if (form[step.title] != undefined) {
      console.log('обновлять надо')
      
    } else {
      form[step.title] = answer
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
                                  <CheckboxWithGreenCheck onChange={checkChange} value={answer} />{answer}
                                </ThemeProvider>
                                </div>
                          
                            {/*<li className="act"><span>{answer}</span></li>*/}
                        })}
                    </ul> : <div class="in_slider">
                        <div class="prpp" style={{ background: `#${params.secondary_color}` }} id="price_info">{value===min?"От":"До"} {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</div>
                        <input id="max_price" type="hidden" value={valuetext} />
                        <ThemeProvider theme={sliderTheme}>
                            <Slider 
                                defaultValue={max-min}
                                getAriaValueText={valuetext}
                                aria-labelledby="non-linear-slider"
                                step={stepS}
                                value={value}
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