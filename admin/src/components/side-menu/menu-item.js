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
    let navigate = useNavigate();
    
    const pushHistory = (url) => {
        navigate(url, { replace: true })
    }

    const childClick = (e) => {
        e.preventDefault()
        e.currentTarget.parentNode.querySelectorAll('li').forEach((el) => {
            el.classList.remove('mm-active') 
        })
        let menuItem = e.currentTarget
        menuItem.classList.add('mm-active') 
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
        if (menuItem.querySelector('.sub-menu')!=undefined){
            if ( menuItem.querySelector('.sub-menu').classList.contains("mm-collapse")) {
                menuItem.classList.add('mm-active')
                menuItem.querySelector('.sub-menu').classList.remove('mm-collapse')
            }
            else {
                menuItem.classList.remove('mm-active')
                menuItem.querySelector('.sub-menu').classList.add('mm-collapse')
            }
        } else {
            document.querySelectorAll('#side-menu li').forEach((el) => {
                el.classList.remove('mm-active')
            })
            menuItem.classList.add('mm-active')
            pushHistory(menuItem.getAttribute('url'))
        }
    }
    return (
        <li key={item.url} url={item.url}>
            <a onClick={menuClick} className={item.children.length!=0?"has-arrow active":"active"} href="#"><i className="nav-item-icon">{item.icon}</i><span>{item.name}</span></a>
            {item.children.length!=0?
                <ul key={item.url+"_expand"} className="sub-menu mm-collapse">
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