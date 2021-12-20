import PageTitle from "../../page-title"

const DomainsPage = () => {
    return(<div className="main-content">
        <div class="page-content">
            <div class="container-fluid">
                <PageTitle title={"Список доменов"} />
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div className="" style={{display:"flex", justifyContent:"end"}}>
                                    <div class="mb-4">
                                        <button type="button" class="btn btn-primary waves-effect waves-light"><i class="feather-plus"></i> Добавить домен</button>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="DataTables_Table_0_length">
                                        <label style={{display:"flex"}}>
                                            Show <select style={{width:"60px", marginLeft:"10px", marginRight:"10px"}} class="custom-select custom-select-sm form-control form-control-sm form-select form-select-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                </select> entries
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                        <label>Поиск:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" /></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table align-middle datatable dt-responsive table-check nowrap dataTable no-footer" style={{borderCollapse: "collapse", borderSpacing: "0px 8px", width: "100%"}} >
                                        <thead>
                                            <tr class="bg-transparent" role="row">
                                                <th style={{width: "30px"}} className="sorting sorting_asc">
                                                    <div class="form-check
                                                        font-size-16">
                                                        <input type="checkbox" name="check" class="form-check-input" id="checkAll" />
                                                        <label class="form-check-label" for="checkAll"></label>
                                                    </div>
                                                </th>
                                                <th style={{width: "120px"}} className="sorting" >ID</th>
                                                <th style={{width: "120px"}} className="sorting" >URL</th>
                                                <th style={{width: "120px"}} className="sorting" >Шаблон</th>
                                                <th style={{width: "120px"}} className="sorting" >Дата создания</th>
                                                <th style={{width: "120px"}} className="sorting" >Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="odd">
                                                <td class="sorting_1">
                                                    <div class="form-check
                                                        font-size-16">
                                                        <input type="checkbox" class="form-check-input" />
                                                        <label class="form-check-label"></label>
                                                    </div>
                                                </td>
                                                <td><a href="javascript: void(0);" class="text-dark fw-medium">#MN0215</a>
                                                </td>
                                                <td>
                                                    12 Oct, 2020
                                                </td>
                                                <td>Connie Franco</td>
                                                <td>
                                                    <div class="badge badge-soft-success
                                                        font-size-12">Paid</div>
                                                </td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button class="btn btn-link
                                                            font-size-16 shadow-none
                                                            py-0 text-muted
                                                            dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="bx
                                                                bx-dots-horizontal-rounded"></i>
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-menu-end">
                                                            <li><a class="dropdown-item" href="#">Edit</a></li>
                                                            <li><a class="dropdown-item" href="#">Print</a></li>
                                                            <li><a class="dropdown-item" href="#">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-5">
                                            <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 12 entries</div>
                                        </div>
                                        <div class="col-sm-12 col-md-7">
                                            <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                <ul class="pagination">
                                                    <li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                        <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                                    </li>
                                                    <li class="paginate_button page-item active">
                                                        <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" class="page-link">1</a>
                                                    </li>
                                                    <li class="paginate_button page-item ">
                                                        <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" class="page-link">2</a>
                                                    </li>
                                                    <li class="paginate_button page-item next" id="DataTables_Table_0_next">
                                                        <a href="#" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" class="page-link">Next</a>
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
</div>
    )
}

export default DomainsPage