import React, { useEffect, useState } from "react"
import { withStyles } from "@mui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBoxItem = ({step, form, setForm, params,  answer}) => {
    const [checked, setChecked] = useState(false)
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

    const checkIfChecked = (answerCh) => {
        if (typeof form[step.title] !== "string") {
            return false
        } else {
            let answers = form[step.title].split(", ")
            let isset = false
            answers.forEach((answer) => {
            if (answer === answerCh) {
                isset = true
                setChecked(true)
            }
            })
            return isset
        }
    }

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
        if (form[step.title] !== undefined && form[step.title] !== "") {
            let answers = form[step.title].split(", ")
            let exists = false
            answers.forEach((answer) => {
                if (answer === answerIn) {
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
            setChecked(true)
            setForm(form)
    }
        
    const unsetAnswer = (answerOut) => {
        let answers = form[step.title].split(", ")
        for (var key in answers) {
            if (answers[key] === answerOut) {
            answers.splice(key, 1);
            }
        }
    
        if (answers.length !== 0) {
            form[step.title] = answers.join(", ")
        } else {
            delete form[step.title]
        }
        setChecked(false)
        setForm(form)
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
    }, [])

    return <div key={answer} style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
            <ThemeProvider theme={theme}>
                <CheckboxWithGreenCheck checked={checked} onChange={checkChange} value={answer} /><span onClick={textClick}>{answer}</span>
            </ThemeProvider>
        </div>
}

export default CheckBoxItem