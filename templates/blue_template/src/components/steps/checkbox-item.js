import React, { useEffect, useState } from "react"
import { withStyles } from "@mui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBoxItem = ({step, form, setForm, checked, updateCheck, index, params,nextStep, prevStep,  answer}) => {
    const [checkedLoc, setChecked] = useState(false)
    const theme = createTheme({
        overrides: {
          MuiCheckbox: {
            colorSecondary: {
              color: '#FFF',
              '&$checked': {
                color: 'FFF',
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
              },
            },
          },
        },
    });

    

    
    /*const checkChange = (event, flag) => {
        if (answer === "Все" && flag) {
            //setAll()
            unsetAll()
        } else if (answer === "Все" && !flag) {
            unsetAll()
        } else {
            if (flag) {
                setAnswer(event.target.value)
            } else {
                unsetAnswer(event.target.value)
            }
        }
    }

    const setAll = () => {
        let newMap = {};
        for (var i in form) {
            if (i != step.title) {
                newMap[i] = form[i];
            }
        }
        newMap[step.title] = "Все, "+domainSettings.locations.map((location)=> location.NameFull).join(", ")
        setForm(newMap)

        setTimeout(()=> {
            console.log(form)
        }, 200)
    }

    const unsetAll = () => {
        setForm((prevState) => {
            let newMap = {};
            for (var i in prevState) {
                if (i != step.title) {
                    newMap[i] = form[i];
                }
            }
            newMap[step.title] = ""
            return newMap
        })
    }

    const textClick = (event) => {
        let text = event.currentTarget.innerHTML
        let exists = false
        if (form[step.title] !== undefined) {
            let answers = form[step.title].split(", ")
            answers.forEach((answer) => {
                if (answer === text) {
                    exists = true
                }
            })
        }
        if (!exists) {
            setAnswer(text)
            setChecked(true)
        } else {
            unsetAnswer(text)
            setChecked(false)
        }
    }

    useEffect(() => {
        checkIfChecked(answer)
    }, [form[step.title].length])*/

    useEffect(()=>{
        setChecked(checked)
    },[checked])


    return <div key={answer+"_wr"} style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
            <ThemeProvider theme={theme}>
                <Checkbox key={answer+"_ch"} checked={checkedLoc} onChange={() => {updateCheck(answer)}} value={answer} /><span>{answer}</span>
            </ThemeProvider>
        </div>
}

export default CheckBoxItem