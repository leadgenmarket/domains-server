import PageTitle from "../../page-title"

const DomainDetail = () => {
    return (<div className="main-content">
                <div class="page-content">
                    <div class="container-fluid">
                        <PageTitle title={"Детальная информация по домену"} />
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="invoice-title">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-grow-1">
                                                    <div class="mb-4">
                                                        <img src="assets/images/logo-sm.svg" alt="" height="24" /><span class="logo-txt">Minia</span>
                                                    </div>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <div class="mb-4">
                                                        <a href="#" class="btn btn-primary w-md waves-effect waves-light">Редактировать</a>
                                                    </div>
                                                </div>
                                            </div>
                                            
                
                                            <p class="mb-1">1874 County Line Road City, FL 33566</p>
                                            <p class="mb-1"><i class="mdi mdi-email align-middle me-1"></i> abc@123.com</p>
                                            <p><i class="mdi mdi-phone align-middle me-1"></i> 012-345-6789</p>
                                        </div>
                                        <hr class="my-4" />
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div>
                                                    <h5 class="font-size-15 mb-3">Billed To:</h5>
                                                    <h5 class="font-size-14 mb-2">Richard Saul</h5>
                                                    <p class="mb-1">1208 Sherwood Circle
                                                        Lafayette, LA 70506</p>
                                                    <p class="mb-1">RichardSaul@rhyta.com</p>
                                                    <p>337-256-9134</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div>
                                                    <div>
                                                        <h5 class="font-size-15">Order Date:</h5>
                                                        <p>February 16, 2020</p>
                                                    </div>
                                                    
                                                    <div class="mt-4">
                                                        <h5 class="font-size-15">Payment Method:</h5>
                                                        <p class="mb-1">Visa ending **** 4242</p>
                                                        <p>richards@email.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                
                                        <div class="py-2 mt-3">
                                            <h5 class="font-size-15">Order summary</h5>
                                        </div>
                                        <div class="p-4 border rounded">
                                            <div class="table-responsive">
                                                <table class="table table-nowrap align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{width: "70px"}}>No.</th>
                                                            <th>Item</th>
                                                            <th class="text-end" style={{width: "120px"}}>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">01</th>
                                                            <td>
                                                                <h5 class="font-size-15 mb-1">Minia</h5>
                                                                <p class="font-size-13 text-muted mb-0">Bootstrap 5 Admin Dashboard </p>
                                                            </td>
                                                            <td class="text-end">$499.00</td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <th scope="row">02</th>
                                                            <td>
                                                                <h5 class="font-size-15 mb-1">Skote</h5>
                                                                <p class="font-size-13 text-muted mb-0">Bootstrap 5 Admin Dashboard </p>
                                                            </td>
                                                            <td class="text-end">$499.00</td>
                                                        </tr>
                
                                                        <tr>
                                                            <th scope="row" colspan="2" class="text-end">Sub Total</th>
                                                            <td class="text-end">$998.00</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" colspan="2" class="border-0 text-end">
                                                                Tax</th>
                                                            <td class="border-0 text-end">$12.00</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row" colspan="2" class="border-0 text-end">Total</th>
                                                            <td class="border-0 text-end"><h4 class="m-0">$1010.00</h4></td>
                                                        </tr>
                                                    </tbody>
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
    )
}

export default DomainDetail