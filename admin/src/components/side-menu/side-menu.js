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
        <div class="vertical-menu">

                <div data-simplebar="init" class="h-100"><div class="simplebar-wrapper" style={{margin: "0px"}}><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style={{right: "-15px", bottom: "0px"}}><div class="simplebar-content-wrapper" style={{height: "100%", overflow: "hidden scroll"}}><div class="simplebar-content" style={{padding: "0px"}}>
                    <div id="sidebar-menu">
                        <ul class="metismenu list-unstyled" id="side-menu">
                            {generateMenuHtml}
                        </ul>
                    </div></div></div></div></div></div>
                </div>
            </div>
    
    )
}

export default SideMenu

/*<div onMouseEnter={menuEnter} onMouseLeave={menuLeave} className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
                <li className="nav-item mr-auto"><a className="navbar-brand" style={{alignItems:"end"}} href="#">
                        <img style={{width: "30px"}} src="/img/logo.png"  alt="Logo"/>
                        <h2 className="brand-text">PlaceX</h2>
                    </a></li>
                <li className="nav-item nav-toggle">
                    <a onClick={toggleClick} className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                        {!collapsed?<Circle size="18" />:<Disc size="18" />}
                        <i className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
            <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                {generateMenuHtml}
            </ul>
        </div>
    </div>*/