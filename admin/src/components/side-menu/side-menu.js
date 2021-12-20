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
    /* 
        badge может пригодиться
        <li className=" nav-item"><a className="d-flex align-items-center" href="index.html"><i data-feather="home"></i><span className="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span><span className="badge badge-light-warning badge-pill ml-auto mr-1">2</span></a>
            <ul className="menu-content">
                <li className="active"><a className="d-flex align-items-center" href="dashboard-analytics.html"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="Analytics">Analytics</span></a>
                </li>
                <li><a className="d-flex align-items-center" href="dashboard-ecommerce.html"><i data-feather="circle"></i><span className="menu-item text-truncate" data-i18n="eCommerce">eCommerce</span></a>
                </li>
            </ul>
        </li> 
    */

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
        <div onMouseEnter={menuEnter} onMouseLeave={menuLeave} className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
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
    </div>
    
    )
}

export default SideMenu