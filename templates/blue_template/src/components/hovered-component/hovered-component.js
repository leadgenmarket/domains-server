import { useState } from "react"

const HoveredComponent = ({params, text, link}) => {
    const [styleC, setStyle] = useState({})
    const defaultStyle = {}
    const hoveredStyle = {color:`#${params.main_color}`}
    
    return <li style={styleC} onMouseLeave={() => setStyle(defaultStyle)} onMouseEnter={() => setStyle(hoveredStyle)}><a href={link} style={styleC} data-def="https://spb.g-n.ru/zhk-tsvetnoy-gorod/" target="_blank"><span >{text}</span></a></li>
}

export default HoveredComponent