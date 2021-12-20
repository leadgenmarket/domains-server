import {CornerDownRight} from 'react-feather'
const MenuItemChildren = ({item, click}) => {
    const itemClick = (e) => {
        
        e.preventDefault()
        let item = e.currentTarget.parentElement
        document.querySelectorAll('#main-menu-navigation li').forEach((el) => {
            el.classList.remove('active')
        })
        item.classList.add('active') 
    }
    return <li onClick={click} url={item.url} key={item.url}><a onClick={itemClick} className="d-flex align-items-center" href="app-invoice-list.html"><b className="child-item-icon"><CornerDownRight size="18" /></b><span className="menu-item text-truncate" data-i18n="List">{item.name}</span></a></li>
}

export default MenuItemChildren