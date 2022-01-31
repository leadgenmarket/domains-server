import PageOrganization from "../../../page-title"
import { useNavigate } from "react-router-dom"
import { Modals, showModal } from "../../../modals"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Component, useEffect, useState } from "react";
import { deleteOrganization, fetchOrganizations, updateOrganization } from "../../../../actions/organizations";
import { Spinner } from "../../../spinner";
import TableItem from "./table-item";

const OrganizationsPage = ({ organizations, deleteOrganization, updateOrganization, fetchOrganizations }) => {
    const navigate = useNavigate();
    const [editOrganization, setEditOrganization] = useState({})
    const forms = [
        {
            title: 'Добавить организацию',
            name: 'addOrganization',
            url: "/api/organizations/",
            type: "put",
            action: (action) => { console.log('need to close modal'); fetchOrganizations() },
            fields: [
                {
                    name: 'Название',
                    json: 'name',
                    type: 'text',
                },
                {
                    name: 'Адрес',
                    json: 'adress',
                    type: 'text',
                },
                {
                    name: 'Номер телефона',
                    json: 'Phone',
                    type: 'text',
                },
            ],
        },
        {
            title: 'Редактировать организацию',
            name: 'updateOrganization',
            url: "/api/organizations/",
            type: "post",
            action: (action) => { console.log(action); fetchOrganizations() },
            edit: (action) => { setEditOrganization(action) },
            //imageurl:"public/objects/"+activeObject.ID+"/actions/", //id
            date: editOrganization,
            clear: false,
            fields: [
                {
                    name: 'Название',
                    json: 'name',
                    type: 'text',
                },
                {
                    name: 'Адрес',
                    json: 'adress',
                    type: 'text',
                },
                {
                    name: 'Номер телефона',
                    json: 'Phone',
                    type: 'text',
                },
                {
                    json: 'ID',
                    type: 'hidden',
                },
            ],
        },
        {
            title: 'Удалить организацию',
            question: 'Вы действительно хотите удалить организацию?',
            name: 'deleteOrganization',
            url: "/api/organizations/" + editOrganization.id,
            type: "delete",
            action: (action) => { console.log(action); fetchOrganizations() },
            //edit: () => {},
            date: editOrganization,
            clear: false,
            fields: [
                {
                    json: 'ID',
                    type: 'hidden',
                },
            ]
        },
    ]
    return <div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <PageOrganization title={"Список подмен"} />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="" style={{ display: "flex", justifyContent: "end" }}>
                                    <div className="mb-4">
                                        <button onClick={() => { showModal('addOrganization') }} type="button" className="btn btn-primary waves-effect waves-light"><i className="feather-plus"></i> Добавить организацию</button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dataTables_length" id="DataTables_Table_0_length">
                                        <label style={{ display: "flex" }}>
                                            Show <select style={{ width: "60px", marginLeft: "10px", marginRight: "10px" }} className="custom-select custom-select-sm form-control form-control-sm form-select form-select-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select> entries
                                        </label>
                                    </div>
                                    </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                <label>Поиск:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" /></label>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <table className="table align-middle datatable dt-responsive table-check nowrap dataTable no-footer table-striped" style={{ borderCollapse: "collapse", borderSpacing: "0px 8px", width: "100%" }} >
                                                    <thead>
                                                        <tr className="bg-transparent" role="row">
                                                            <th style={{ width: "30px" }} className="sorting sorting_asc">
                                                                <div className="form-check font-size-16">
                                                                    <input type="checkbox" name="check" className="form-check-input" id="checkAll" />
                                                                    <label className="form-check-label" htmlFor="checkAll"></label>
                                                                </div>
                                                            </th>
                                                            <th style={{}} className="sorting" >Название</th>
                                                            <th style={{}} className="sorting" >Адрес</th>
                                                            <th style={{}} className="sorting" >Номер телефона</th>
                                                            <th style={{ width: "200px" }} className="sorting" >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            organizations.map((organization) => {
                                                                return <TableItem key={organization.id} organization={organization} deleteOrganization={(e) => { e.preventDefault(); setEditOrganization(organization); showModal("deleteOrganization") }} updateOrganization={(e) => { e.preventDefault(); setEditOrganization(organization); showModal("updateOrganization") }} />
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 12 entries</div>
                                            </div>
                                            <div className="col-sm-12 col-md-7">
                                                <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                    <ul className="pagination">
                                                        <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                            <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" className="page-link">Previous</a>
                                                        </li>
                                                        <li className="paginate_button page-item active">
                                                            <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" className="page-link">1</a>
                                                        </li>
                                                        <li className="paginate_button page-item ">
                                                            <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" className="page-link">2</a>
                                                        </li>
                                                        <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                            <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" className="page-link">Next</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modals forms={forms} />
    </div>
}

class OrganizationListPageContainer extends Component {

    componentDidMount() {
        this.props.fetchOrganizations();
    }

    render() {
        const { organizations, loading, error, deleteOrganization, updateOrganization, fetchOrganizations } = this.props;
        if (loading || organizations == null) {
            return <Spinner />
        }
        return <OrganizationsPage organizations={organizations} loading={loading} error={error} deleteOrganization={deleteOrganization} updateOrganization={updateOrganization} fetchOrganizations={fetchOrganizations} />;
    }
}

const mapStateToProps = ({ organizationsList: { organizations, loading, error } }) => {
    return { organizations, loading, error };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchOrganizations: fetchOrganizations(apiService),
        updateOrganization: updateOrganization,
        deleteOrganization: deleteOrganization,
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(OrganizationListPageContainer);