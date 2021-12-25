import React from "react"
import { withStyles } from "@mui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const TextStep = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {
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

    const textClick = (event) => {
        let text = event.currentTarget.innerHTML
        let exists = false
        if (form[step.title] !== undefined) {
            let answers = form[step.title].split(", ")
            answers.forEach((answer) => {
                if (answer == text) {
                    exists = true
                }
            })
        }
        if (!exists) {
            setAnswer(event.target.value)
        } else {
            unsetAnswer(event.target.value)
        }
    }

    return <ul className="check_list_one check_list" id="kv_list">
        {step.answers.map((answer) => {
            return <div key={answer} style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
                    <ThemeProvider theme={theme}>
                        <CheckboxWithGreenCheck defaultChecked={checkIfChecked(answer)} onChange={checkChange} value={answer} /><span onClick={textClick}>{answer}</span>
                    </ThemeProvider>
                </div>
        })}
    </ul>
}

export default TextStep