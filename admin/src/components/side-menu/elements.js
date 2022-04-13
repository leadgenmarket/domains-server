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
        name: 'Лиды',
        icon: <i className="feather-dollar-sign" />,
        status: false,
        url: "/leads",
        children: []
    },
    {
        name: 'Подмены',  
        icon: <i className="feather-repeat" />,
        status: false,
        url: "/titles",
        children: []
    },
    {
        name: 'Цены по районам',  
        icon: <i className="feather-dollar-sign" />,
        status: false,
        url: "/prices",
        children: []
    },
    {
        name: 'Портал',
        icon: <i className="feather-at-sign" />,
        status: false,
        url: "/portal",
        children: [
            {
                name: 'Города',
                status: false,
                url: "/portal/cities", //ClientsAll
            },
            {
                name: 'Локации',
                status: false,
                url: "/portal/locations", //ClientsAll
            },
        ]
    },
    {
        name: 'Организации',
        icon: <i className="feather-command" />,
        status: false,
        url: "/organizations",
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