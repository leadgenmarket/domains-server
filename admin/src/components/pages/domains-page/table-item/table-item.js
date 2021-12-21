const TableItem = () => {
    return (<tr className="odd">
        <td className="sorting_1">
            <div className="form-check font-size-16">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label"></label>
            </div>
        </td>
        <td><a href="#" className="text-dark fw-medium">d43556sfj213k</a></td>
        <td>spb-kvartiry-msk.ru</td>
        <td>Connie Franco</td>
        <td><div className="badge badge-soft-success font-size-12">12 Oct, 2020</div></td>
        <td>
            <div className="dropdown">
                <button className="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="feather-more-horizontal"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#">Edit</a></li>
                    <li><a className="dropdown-item" href="#">Print</a></li>
                    <li><a className="dropdown-item" href="#">Delete</a></li>
                </ul>
            </div>
        </td>
    </tr>

    )
}

export default TableItem