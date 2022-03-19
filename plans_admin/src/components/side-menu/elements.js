import {ShoppingCart} from "react-feather"

export default [
    {
        name: 'Домены',
        icon:  <i className="feather-globe" />,
        status: false,
        url: "/",
        children: []
    },
    {
        name: 'Выход',
        icon: <i className="feather-lock" />,
        status: false,
        url: "/log-out",
        children: []
    },
]