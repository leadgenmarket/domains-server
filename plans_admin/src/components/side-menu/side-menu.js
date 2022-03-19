import { element } from 'prop-types'
import MenuItem from './menu-item'
import items from './elements'
import {Disc, Circle} from "react-feather"
import { useState } from 'react'
const SideMenu = () =>{
    const [collapsed, setCollapsed] = useState(false)
    const generateMenuHtml = items.map((item) => {
        return <MenuItem key={item.url} item={item}/>
    })
    const toggleClick = (e) => {
        e.preventDefault()
        if (collapsed) {
            document.querySelector('.main-menu').classList.add('expanded')
            document.querySelector('body').classList.add('menu-expanded')
            document.querySelector('body').classList.remove('menu-collapsed')
            
        } else {
           

            document.querySelector('.main-menu').classList.remove('expanded')
            document.querySelector('body').classList.remove('menu-expanded')
            document.querySelector('body').classList.add('menu-collapsed')
        }
        setCollapsed(!collapsed)
    }

    const menuEnter = (e) => {
        if (collapsed) {
            document.querySelector('.main-menu').classList.add('expanded')
        }
    }
    const menuLeave = (e) => {
        if (collapsed) {
            document.querySelector('.main-menu').classList.remove('expanded')
        }
    }
    return(
        <div className="vertical-menu">

                <div data-simplebar="init" className="h-100"><div className="simplebar-wrapper" style={{margin: "0px"}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: "-15px", bottom: "0px"}}><div className="simplebar-content-wrapper" style={{height: "100%", overflow: "hidden scroll"}}><div className="simplebar-content" style={{padding: "0px"}}>
                    <div id="sidebar-menu">
                        <ul className="metismenu list-unstyled" id="side-menu">
                            {generateMenuHtml}
                        </ul>
                    </div></div></div></div></div></div>
                </div>
            </div>
    
    )
}

export default SideMenu