import { useEffect, useState } from "react"

const BtnComponent = ({ params, clickFunct, text, analog }) => {
    let mainColor = params.main_color == "5ABBB0" ? "fff" : params.main_color
    let secondaryColor = params.secondary_color == "27353E" ? "453fac" : params.secondary_color

    const [styleC, setStyle] = useState({ background: `#${secondaryColor}`, color: `#${mainColor}`, borderColor: `#${mainColor}` })

    useEffect(() => {
        if (!analog) {
            setStyle(defaultStyle)
        } else {
            setStyle(analogDefaultStyle)
        }
    }, [params])

    const defaultStyle = { background: `#${mainColor}`, color: `#${secondaryColor}`, borderColor: `#${secondaryColor} 2px solid` }
    const hoveredStyle = { background: `#${secondaryColor}`, color: `#${mainColor}`, borderColor: `#${secondaryColor} 2px solid` }
    const analogHoveredStyle = { background: `#${mainColor}`, color: `#${secondaryColor}`, border: `#${secondaryColor} 2px solid` }
    const analogDefaultStyle = { background: `#${secondaryColor}`, color: `#${mainColor}`, border: `#${secondaryColor} 2px solid` }
    if (analog) {
        return <button className="btn_main" style={styleC} onMouseLeave={() => setStyle(analogDefaultStyle)} onMouseEnter={() => setStyle(analogHoveredStyle)} onClick={clickFunct} >{text}</button>
    }
    return <a href="#" class="btn_main fixed_btn step_btn" style={styleC} onMouseLeave={() => setStyle(hoveredStyle)} onMouseEnter={() => setStyle(defaultStyle)} onClick={clickFunct}>{text}</a>
}
/*
<a className="btn" href="#" onMouseLeave={() => setStyle(defaultStyle)} onMouseEnter={() => setStyle(hoveredStyle)} onClick={clickFunct} style={styleC}>{text}</a>
*/

export default BtnComponent