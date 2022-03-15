const PageTitle = ({title}) => {
    return(
        <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-sm-flex align-items-center
                            justify-content-between">
                            <h4 className="mb-sm-0 font-size-18">{title}</h4>
                        </div>
                    </div>
                </div>
    )
}

export default PageTitle