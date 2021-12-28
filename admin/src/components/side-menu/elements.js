import {ShoppingCart} from "react-feather"

export default [
    {
        name: 'Домены',
        icon:  <i className="feather-globe" />,
        status: false,
        url: "/admin/",
        children: []
    },
    /*{
        name: 'Шаблоны',
        icon: <i className="feather-clipboard" />,
        status: false,
        url: "/admin/templates",
        children: []
    },*/
    {
        name: 'Лиды',
        icon: <i className="feather-dollar-sign" />,
        status: false,
        url: "/admin/leads",
        children: []
    },
    {
        name: 'Подмены',  
        icon: <i className="feather-repeat" />,
        status: false,
        url: "/admin/titles",
        children: []
    },
    {
        name: 'Портал',
        icon: <i className="feather-at-sign" />,
        status: false,
        url: "/admin/portal",
        children: [
            {
                name: 'Города',
                status: false,
                url: "/admin/portal/cities", //ClientsAll
            },
            {
                name: 'Локации',
                status: false,
                url: "/admin/portal/locations", //ClientsAll
            },
        ]
    },
    {
        name: 'Организации',
        icon: <i className="feather-command" />,
        status: false,
        url: "/admin/organizations",
        children: []
    },
    {
        name: 'Выход',
        icon: <i className="feather-lock" />,
        status: false,
        url: "/admin/log-out",
        children: []
    },
]