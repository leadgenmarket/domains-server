import React, { useEffect, useState } from "react"
import { withStyles } from "@mui/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBoxItem = ({step, form, setForm, checked, updateCheck, index, params,nextStep, prevStep,  answer}) => {
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


    return <div key={answer+"_wr"} style={{position:"relative", cursor: "pointer", fontSize: "22px", color: "#FFF", lineHeight: "22px", textDecoration : "underline"}} className="act">
            <ThemeProvider theme={theme}>
                <Checkbox key={answer+"_ch"} checked={checked} onChange={() => {updateCheck(answer)}} value={answer} /><span>{answer}</span>
            </ThemeProvider>
        </div>
}

export default CheckBoxItem