import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../../../services/api-service";
import JSONPretty from 'react-json-pretty';

const TableItem = ({ lead, fetchLeads }) => {
    const { _id, created_at, f_info, phone, name } = lead
    const siteName = lead.ut_type
    const city = lead.s_name
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(' / ')
    }
    const showDropDown = (event) => {
        setShow(!show)
    }

    const hrefClick = (event) => {
        event.preventDefault()
        navigate(event.target.getAttribute('href'), { replace: false })
    }
    const deleteClick = (event) => {
        event.preventDefault()
        let apiService = new ApiService
        /*apiService.deleteDomain(id).then((response) => {
            fetchDomains()
        })*/
    }

    return (<React.Fragment><tr key={_id} className="odd">
        <td className="sorting_1">
            <div className="form-check font-size-16">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label"></label>
            </div>
        </td>
        <td><a target="_blank"  >{phone}</a></td>
        <td>{name}</td>
        <td>{city}</td>
        <td>{siteName}</td>
        <td>{convertDate(Date.parse(created_at))}</td>
        <td>
            <a href={_id} onClick={hrefClick} className="dropdown" style={{ cursor: "pointer" }}>Подробнее <i className="feather-chevron-right"></i>
            </a>
        </td>
    </tr>
    </React.Fragment>

    )
}

export default TableItem