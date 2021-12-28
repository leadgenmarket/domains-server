import PageTitle from "../../../page-title"
import { useNavigate } from "react-router-dom"
import { Modals, showModal } from "../../../modals"
import forms from "./forms"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Component, useEffect, useState } from "react";
import { fetchTitles } from "../../../../actions/titles";
import { Spinner } from "../../../spinner";
import TableItem from "./table-item";

const TitlesPage = ({titles}) => {
    const navigate= useNavigate();
    return <div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <PageTitle title={"Список подмен"} />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="" style={{ display: "flex", justifyContent: "end" }}>
                                    <div className="mb-4">
                                        <button onClick={() => { showModal('addTitle')}} type="button" className="btn btn-primary waves-effect waves-light"><i className="feather-plus"></i> Добавить тайтл</button>
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
                                                            <th style={{ width: "60px" }} className="sorting" >ID</th>
                                                            <th style={{  }} className="sorting" >Title</th>
                                                            <th style={{ width: "200px" }} className="sorting" >Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            titles.map((title) => {
                                                                console.log(title)
                                                                return <TableItem title={title} />
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

class TitleListPageContainer extends Component {
    
    componentDidMount() {
      this.props.fetchTitles();
    }
  
    render() {
      const { titles, loading, error } = this.props;
      if (loading || titles == null) {
          return <Spinner />
      }
      return <TitlesPage titles={titles} loading={loading} error={error} />;
    }
  }
  
  const mapStateToProps = ({ titlesList: { titles, loading, error }}) => {
    return { titles, loading, error };
  };
  
  const mapDispatchToProps = (dispatch, { apiService}) => {
    return bindActionCreators({
        fetchTitles: fetchTitles(apiService),
    }, dispatch);
  };

  export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
  )(TitleListPageContainer);