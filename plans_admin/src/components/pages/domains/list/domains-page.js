import PageTitle from "../../../page-title"
import TableItem from "./table-item"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Component, useEffect, useRef, useState } from "react";
import { fetchDomains, fetchMore } from "../../../../actions/domains";
import { Spinner } from "../../../spinner";
import { useNavigate } from "react-router-dom"
import { Modals, showModal } from "../../../modals"

const DomainsPage = ({ domains, cursor, loading, fetchDomains, fetchMore }) => {
    const [templates, setTemplates] = useState(null)
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState("")
    const [editDomain, setEditDomain] = useState({})
    const navigate = useNavigate();
    console.log(domains)

    const getTemplateById = (id) => {
        let name = ""
        if (templates != null) {
            templates.map(template => {
                if (template.ID == id) {
                    name = template.Name
                }
            });
        }
        return name
    }

    const forms = [
        {
            title: 'Добавить домен',
            name: 'addDomain',
            url: "/api/plans-sites/",
            type: "put",
            action: (action) => { console.log('need to close modal'); fetchDomains() },
            fields: [
                {
                    name: 'Название',
                    json: 'name',
                    type: 'text',
                },
                {
                    name: 'Url домена',
                    json: 'url',
                    type: 'text',
                },
            ],
        },
        {
            title: 'Редактировать домен',
            name: 'updateDomain',
            url: "/api/plans-sites/",
            type: "post",
            action: (action) => { console.log(action); fetchDomains() },
            edit: (action) => { setEditDomain(action) },
            //imageurl:"public/objects/"+activeObject.ID+"/actions/", //id
            date: editDomain,
            clear: false,
            fields: [
                {
                    name: 'Name',
                    json: 'name',
                    type: 'text',
                },
                {
                    name: 'Url',
                    json: 'url',
                    type: 'text',
                },
                {
                    json: 'ID',
                    type: 'hidden',
                },
            ],
        },
        {
            title: 'Удалить домен',
            question: 'Вы действительно хотите удалить домен?',
            name: 'deleteDomain',
            url: "/api/plans-sites/" + editDomain.ID,
            type: "delete",
            action: (action) => { console.log(action); fetchDomains() },
            //edit: () => {},
            date: editDomain,
            clear: false,
            fields: [
                {
                    json: 'ID',
                    type: 'hidden',
                },
            ]
        },
    ]

    return (<div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <PageTitle title={"Список доменов"} />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="" style={{ display: "flex", justifyContent: "end" }}>
                                    <div className="mb-4">
                                        <button onClick={() => { showModal('addDomain') }} type="button" className="btn btn-primary waves-effect waves-light"><i className="feather-plus"></i> Добавить домен</button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                        {/*<div className="row">
                                            <div className="col-sm-12 col-md-6">
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                    <label>Поиск:<input onChange={searchDomains} type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" /></label>
                                                </div>
                                            </div>
                                        </div>*/}
                                        <div className="row">
                                            <div className="col-sm-12" style={{ paddingBottom: "50px" }}>
                                                <table className="table align-middle datatable dt-responsive table-check nowrap dataTable no-footer table-striped" style={{ borderCollapse: "collapse", borderSpacing: "0px 8px", width: "100%" }} >
                                                    <thead>
                                                        <tr className="bg-transparent" role="row">
                                                            <th className="sorting" >ID</th>
                                                            <th className="sorting" >Название</th>
                                                            <th className="sorting" >URL</th>
                                                            <th className="sorting" >Действия</th>
                                                        </tr>
                                                    </thead>
                                                    {domains == null ? <tbody></tbody> : <tbody>
                                                        {
                                                            domains.map((domain) => {
                                                                console.log(domain)
                                                                domain.templateName = getTemplateById(domain.template_id)
                                                                return <TableItem domain={domain} fetchDomains={fetchDomains} setEditDomain={() => { setEditDomain(domain) }} />
                                                            })
                                                        }
                                                    </tbody>}
                                                </table>
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
    )
}


class DomainListPageContainer extends Component {

    componentDidMount() {
        this.props.fetchDomains();
    }

    render() {
        const { domains, loading, error, fetchDomains, fetchMore } = this.props;
        if (loading) {
            return <Spinner />
        }
        return <DomainsPage domains={domains} loading={loading} error={error} fetchDomains={fetchDomains} fetchMore={fetchMore} />;
    }
}

const mapStateToProps = ({ domainsList: { domains, cursor, loading, error } }) => {
    return { domains, cursor, loading, error };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchDomains: fetchDomains(apiService),
        fetchMore: fetchMore(apiService)
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DomainListPageContainer);