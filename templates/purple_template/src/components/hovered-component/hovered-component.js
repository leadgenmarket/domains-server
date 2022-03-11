import { useState } from "react"

const HoveredComponent = ({ params, text, link }) => {
    const [styleC, setStyle] = useState({})
    const defaultStyle = {}
    const hoveredStyle = { color: `#${params.main_color}` }

    //return <li style={styleC} onMouseLeave={() => setStyle(defaultStyle)} onMouseEnter={() => setStyle(hoveredStyle)}><a href={link} style={styleC} target="_blank"><span >{text}</span></a></li>
    return <li>
        <a style={{ textDecoration: "none" }} href={link} target="_blank">
            <div class="jk_img">
                <img src="//media.g-n.ru/upload/resize_cache/iblock/2bd/180_360_2/2bd934252ab3124211b5023102586703.jpg" />
            </div>
            <span>{text}</span>
            <div class="apart_count">106 квартир</div>
        </a>
    </li>
}

export default HoveredComponent