import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../../../services/api-service";

const TableItem = ({domain:{id, url, templateName, CreatedAt}, fetchDomains}) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join(' / ')
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
        apiService.deleteDomain(id).then((response) => {
            fetchDomains()
        })
    }
      
    return (<tr key={id} className="odd">
                <td className="sorting_1">
                    <div className="form-check font-size-16">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label"></label>
                    </div>
                </td>
                <td><a  onClick={hrefClick} href={id} className="text-dark fw-medium">{id}</a></td>
                <td><a target="_blank" href={"http://"+url} >{url}</a></td>
                <td>{templateName}</td>
                <td>{convertDate(Date.parse(CreatedAt))}</td>
                <td>
                    <div className="dropdown">
                        <button onClick={showDropDown} className="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="feather-more-horizontal"></i>
                        </button>
                        <ul className={show?"dropdown-menu dropdown-menu-end show":"dropdown-menu dropdown-menu-end"}>
                            <li><a className="dropdown-item" onClick={hrefClick} href={"/admin/edit/"+id}>Редактировать</a></li>
                            <li><a className="dropdown-item" onClick={deleteClick} href="#">Удалить</a></li>
                        </ul>
                    </div>
                </td>
             </tr>

    )
}

export default TableItem