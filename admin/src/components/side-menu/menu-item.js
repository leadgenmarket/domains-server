import MenuItemChildren from './menu-item-children'
import React, {Component}  from "react";
import { bindActionCreators } from 'redux';
import {fetchLogout} from '../../actions'
import { withApiService } from '../../components/hoc';
import { connect } from 'react-redux';
import './menu-item.css'
import { useNavigate, useLocation } from "react-router-dom";
import { compose } from '../../utils';
const MenuItem = ({item, logout}) => {
    const location = useLocation().pathname;
    let history = useNavigate();
    
    const pushHistory = (url) => {
        history.push(url);
    }

    const childClick = (e) => {
        e.preventDefault()
        console.log(e.currentTarget)
        let menuItem = e.currentTarget
        menuItem.classList.add('active') 
        pushHistory(menuItem.getAttribute('url'))
    }
    const childrenHtml = item.children.map((item)=>{
        return <MenuItemChildren key={item.children} item={item} click={childClick}/>
    }) 
    const menuClick = (e) => {
        e.preventDefault()
        if (logout!=null){
            console.log(logout)
            logout()
        }
        let menuItem = e.currentTarget.parentElement
        if (menuItem.querySelector('.menu-content')!=undefined){
            if ( menuItem.querySelector('.menu-content').style.display == "block") {
                menuItem.querySelector('.menu-content').style.display = "none"
                menuItem.classList.remove('open')
            }
            else {
                menuItem.querySelector('.menu-content').style.display = "block"
                menuItem.classList.add('open')
            }
        } else {
            document.querySelectorAll('#main-menu-navigation li').forEach((el) => {
                el.classList.remove('active')
            })
            menuItem.classList.add('active') 
            pushHistory(menuItem.getAttribute('url'))
        }
    }
    return (
        <li key={item.url} url={item.url} className={item.children.length==0?location==item.url?"nav-item active":"nav-item":location==item.url?"nav-item has-sub active":"nav-item has-sub "}><a onClick={menuClick} className="d-flex align-items-center" href="#"><i className="nav-item-icon">{item.icon}</i><span className="menu-title text-truncate" data-i18n="Invoice">{item.name}</span></a>
            {item.children.length!=0?
                <ul key={item.url+"_expand"} className="menu-content">
                    {childrenHtml}
                </ul>:
                ""}
        </li>
    )
}

class MenuItemContainer extends Component {

    componentDidMount() {
      //this.props.login();
    }
  
    render() {
      const {item, logout} = this.props;
    if  (item.name=="Выход"){
      return <MenuItem item= {item} logout={logout} />;
    } else {
        return  <MenuItem item= {item} logout={null} />
    }
    }
  }
  
  
  
  const mapDispatchToProps = (dispatch, { apiService}) => {
    return bindActionCreators({
        logout: fetchLogout(apiService)
    }, dispatch);
  };
  
  export default compose(
    withApiService(),
    connect(null, mapDispatchToProps)
  )(MenuItemContainer);