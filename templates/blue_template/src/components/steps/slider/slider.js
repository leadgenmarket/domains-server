import React from "react";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "yellow"
      },
      track: {
        color: "red"
      },
      rail: {
        color: "black"
      }
    }
  }
});

export default function V4Slider() {
  return (
    <ThemeProvider theme={muiTheme}>
      <Slider min={18} max={90} defaultValue={40} />
    </ThemeProvider>
  );
}
