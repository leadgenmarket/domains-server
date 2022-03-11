import { useState } from "react"

const HoveredComponent = ({ params, text, link, photo, count }) => {


    return <li>
        <a style={{ textDecoration: "none" }} href={link} target="_blank">
            <div class="jk_img">
                <img src={"//media.g-n.ru" + photo} />
            </div>
            <span>{text}</span>
            <div class="apart_count">{count} квартир</div>
        </a>
    </li>
}

export default HoveredComponent