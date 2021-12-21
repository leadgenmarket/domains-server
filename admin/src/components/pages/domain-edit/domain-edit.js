import { useNavigate } from "react-router-dom"
import PageTitle from "../../page-title"

const DomainEdit = () => {
    const navigate= useNavigate();
    return (<div className="main-content">
            <div class="page-content">
                    <div class="container-fluid">
                        <PageTitle title="Добавление домена" />
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div id="basic-pills-wizard" class="twitter-bs-wizard">
                                            <ul class="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                                <li class="nav-item">
                                                    <a href="#seller-details" class="nav-link active" data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Seller Details">
                                                            <i class="feather-globe"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#company-document" class="nav-link" data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-settings"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div class="tab-content
                                                twitter-bs-wizard-tab-content">
                                                <div class="tab-pane active" id="seller-details">
                                                    <div class="text-center mb-4">
                                                        <h5>Информация о домене</h5>
                                                        <p class="card-title-desc">Заполните запрашиваемую информацию</p>
                                                    </div>
                                                    <form>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label for="basicpill-firstname-input" class="form-label">Доменное имя (без http)</label>
                                                                    <input type="text" class="form-control" id="basicpill-firstname-input" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label for="basicpill-lastname-input" class="form-label">Шаблон</label>
                                                                    <input type="text" class="form-control" id="basicpill-lastname-input" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <ul class="pager wizard  twitter-bs-wizard-pager-link">
                                                        <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Далее <i class="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane" id="company-document">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Company Document</h5>
                                                            <p class="card-title-desc">Fill all
                                                                information below</p>
                                                        </div>
                                                        <form>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-pancard-input" class="form-label">PAN
                                                                            Card</label>
                                                                        <input type="text" class="form-control" id="basicpill-pancard-input" />
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-vatno-input" class="form-label">VAT/TIN
                                                                            No.</label>
                                                                        <input type="text" class="form-control" id="basicpill-vatno-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-cstno-input" class="form-label">CST
                                                                            No.</label>
                                                                        <input type="text" class="form-control" id="basicpill-cstno-input" />
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Service
                                                                            Tax No.</label>
                                                                        <input type="text" class="form-control" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-companyuin-input" class="form-label">Company
                                                                            UIN</label>
                                                                        <input type="text" class="form-control" id="basicpill-companyuin-input" />
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-declaration-input" class="form-label">Declaration</label>
                                                                        <input type="text" class="form-control" id="basicpill-declaration-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li class="previous disabled"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="bx
                                                                        bx-chevron-left me-1"></i>
                                                                    Previous</a></li>
                                                            <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Next <i class="bx
                                                                        bx-chevron-right ms-1"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="bank-detail">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Bank Details</h5>
                                                            <p class="card-title-desc">Fill all
                                                                information below</p>
                                                        </div>
                                                        <form>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-namecard-input" class="form-label">Name
                                                                            on Card</label>
                                                                        <input type="text" class="form-control" id="basicpill-namecard-input" />
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Credit
                                                                            Card Type</label>
                                                                        <select class="form-select">
                                                                            <option selected="">Select
                                                                                Card Type</option>
                                                                            <option value="AE">American
                                                                                Express</option>
                                                                            <option value="VI">Visa</option>
                                                                            <option value="MC">MasterCard</option>
                                                                            <option value="DI">Discover</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-cardno-input" class="form-label">Credit
                                                                            Card Number</label>
                                                                        <input type="text" class="form-control" id="basicpill-cardno-input" />
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-card-verification-input" class="form-label">Card
                                                                            Verification Number</label>
                                                                        <input type="text" class="form-control" id="basicpill-card-verification-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-expiration-input" class="form-label">Expiration
                                                                            Date</label>
                                                                        <input type="text" class="form-control" id="basicpill-expiration-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li class="previous disabled"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="bx
                                                                        bx-chevron-left me-1"></i>
                                                                    Previous</a></li>
                                                            <li class="float-end"><a href="javascript: void(0);" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".confirmModal">Save
                                                                    Changes</a></li>
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
            </div>)
}

export default DomainEdit