import PageTitle from "../../../page-title"
import TableItem from "./table-item"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Component, useEffect, useRef, useState } from "react";
import { fetchLeads, fetchMoreLeads } from "../../../../actions/leads";
import { Spinner } from "../../../spinner";
import { useNavigate } from "react-router-dom"
import ApiService from "../../../../services/api-service";
import { toast } from "react-toastify";
import { BottomScrollListener } from 'react-bottom-scroll-listener';

const LeadsPage = ({ leads, loading, cursor, fetchLeads, fetchMoreLeads }) => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false)
    useEffect(() => {
    }, [])

    const onBottom = () => {
        if (load !== true && loading !== true) {
            setLoad(true)
            fetchMoreLeads("", cursor, 15)
            setTimeout(() => {
                setLoad(false)
            }, 1000)
        }

    };
    return (<div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <PageTitle title={"Список лидов"} />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">

                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                    <label>Поиск:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <BottomScrollListener offset={100} onBottom={onBottom} >
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
                                                                <th style={{ width: "80px" }} className="sorting" >Номер телефона</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Имя</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Город</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Сайт</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Дата</th>
                                                                <th style={{ width: "80px" }} className="sorting" >Действия</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                leads.map((lead) => {
                                                                    return <TableItem lead={lead} fetchLeads={fetchLeads} />
                                                                })
                                                            }
                                                        </tbody>
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
        this.props.fetchLeads("", "", 15);
    }

    render() {
        const { leads, cursor, loading, error, fetchLeads, fetchMoreLeads } = this.props;
        if (loading || leads == null) {
            return <Spinner />
        }
        return <LeadsPage leads={leads} cursor={cursor} loading={loading} error={error} fetchLeads={fetchLeads} fetchMoreLeads={fetchMoreLeads} />;
    }
}

const mapStateToProps = ({ leadsList: { leads, cursor, loading, error } }) => {
    return { leads, cursor, loading, error };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchLeads: fetchLeads(apiService),
        fetchMoreLeads: fetchMoreLeads(apiService)
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DomainListPageContainer);