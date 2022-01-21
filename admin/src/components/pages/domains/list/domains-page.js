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
import ApiService from "../../../../services/api-service";
import { toast } from "react-toastify";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

const DomainsPage = ({ domains, cursor, loading, fetchDomains, fetchMore }) => {
    const [templates, setTemplates] = useState(null)
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        let apiService = new ApiService
        apiService.templatesList().then((response) => {
            setTemplates(response.data)
        })
    }, [])

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

    const onBottom = () => {
        if (load === false && loading === false) {
            setLoad(true)
            fetchMore(search, cursor, 15)
            setTimeout(() => {
                setLoad(false)
            }, 1000)
        }
    };

    const searchDomains = (event) => {
        setSearch(event.target.value)
        fetchDomains(event.target.value, "", 15)
    }
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
                                        <button onClick={() => { navigate('/add', { replace: false }) }} type="button" className="btn btn-primary waves-effect waves-light"><i className="feather-plus"></i> Добавить домен</button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                    <label>Поиск:<input onChange={searchDomains} type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <BottomScrollListener offset={20} onBottom={onBottom} >
                                                <div className="col-sm-12">
                                                    <table className="table align-middle datatable dt-responsive table-check nowrap dataTable no-footer table-striped" style={{ borderCollapse: "collapse", borderSpacing: "0px 8px", width: "100%" }} >
                                                        <thead>
                                                            <tr className="bg-transparent" role="row">
                                                                <th style={{ width: "30px" }} className="sorting sorting_asc">
                                                                    <div className="form-check
                                                        font-size-16">
                                                                        <input type="checkbox" name="check" className="form-check-input" id="checkAll" />
                                                                        <label className="form-check-label" htmlFor="checkAll"></label>
                                                                    </div>
                                                                </th>
                                                                <th style={{ width: "80px" }} className="sorting" >ID</th>
                                                                <th style={{ width: "80px" }} className="sorting" >URL</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Шаблон</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Дата создания</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Действия</th>
                                                            </tr>
                                                        </thead>
                                                        {domains == null ? <tbody></tbody> : <tbody>
                                                            {
                                                                domains.map((domain) => {
                                                                    domain.templateName = getTemplateById(domain.template_id)
                                                                    return <TableItem domain={domain} fetchDomains={fetchDomains} />
                                                                })
                                                            }
                                                        </tbody>}
                                                    </table>
                                                </div>
                                            </ BottomScrollListener>
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
    )
}


class DomainListPageContainer extends Component {

    componentDidMount() {
        this.props.fetchDomains("", "", 15);
    }

    render() {
        const { domains, cursor, loading, error, fetchDomains, fetchMore } = this.props;
        if (loading) {
            return <Spinner />
        }
        return <DomainsPage domains={domains} cursor={cursor} loading={loading} error={error} fetchDomains={fetchDomains} fetchMore={fetchMore} />;
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