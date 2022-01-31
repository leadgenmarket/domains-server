import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TableItem = ({ organization: { id, name, phone, adress }, deleteOrganization, updateOrganization }) => {
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


    const deleteClick = (event) => {
        event.preventDefault()
        deleteOrganization()
    }

    return (<tr key={id} className="odd">
        <td className="sorting_1">
            <div className="form-check font-size-16">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label"></label>
            </div>
        </td>
        <td><a target="_blank">{name}</a></td>
        <td><a target="_blank">{adress}</a></td>
        <td><a target="_blank">{phone}</a></td>
        <td>
            <div className="dropdown">
                <button onClick={showDropDown} className="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="feather-more-horizontal"></i>
                </button>
                <ul className={show ? "dropdown-menu dropdown-menu-end show" : "dropdown-menu dropdown-menu-end"}>
                    <li><a className="dropdown-item" onClick={updateOrganization} href={"/admin/edit/" + id}>Редактировать</a></li>
                    <li><a className="dropdown-item" onClick={deleteOrganization} href="#">Удалить</a></li>
                </ul>
            </div>
        </td>
    </tr>

    )
}

export default TableItem