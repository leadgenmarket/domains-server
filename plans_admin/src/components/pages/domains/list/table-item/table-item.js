import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../../../../services/api-service";
import { showModal } from "../../../../modals"

const TableItem = ({domain:{ID, Name, URL}, fetchDomains, setEditDomain}) => {
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
        apiService.deleteDomain(ID).then((response) => {
            fetchDomains()
        })
    }
      
    return (<tr key={ID} className="odd">
                <td><a  onClick={hrefClick} href={ID} className="text-dark fw-medium">{ID}</a></td>
                <td>{Name}</td>
                <td><a target="_blank" href={"http://"+URL} >{URL}</a></td>
                <td>
                    <div className="dropdown">
                        <button onClick={showDropDown} className="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="feather-more-horizontal"></i>
                        </button>
                        <ul className={show?"dropdown-menu dropdown-menu-end show":"dropdown-menu dropdown-menu-end"}>
                            <li><a className="dropdown-item" onClick={(e) => {e.preventDefault(); showModal('updateDomain'); setEditDomain()}} href={"/edit/"+ID}>Редактировать</a></li>
                            <li><a className="dropdown-item" onClick={deleteClick} href="#">Удалить</a></li>
                        </ul>
                    </div>
                </td>
             </tr>

    )
}

export default TableItem