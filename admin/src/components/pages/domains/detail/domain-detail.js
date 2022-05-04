import PageTitle from "../../../page-title"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom'
import { Component, useEffect } from "react";
import { fetchDomain } from "../../../../actions/domain-detail";
import { Spinner } from "../../../spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DomainDetail = ({ domain, loading, fetchDomain }) => {
    const { id } = useParams()
    useEffect(() => {
        fetchDomain(id)
    }, [id])
    const navigate = useNavigate()

    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(' / ')
    }

    const moderationChange = (e) => {
        e.preventDefault()
        let data = {
            id: id,
            moderation: e.target.checked
        }
        domain.Moderation = e.target.checked
        axios.post("/api/domains/moderation", data).then((response) => {
            fetchDomain(id)
        })
    }

    if (loading || domain == null) {
        return <Spinner />
    }

    const editClick = (event) => {
        event.preventDefault()
        navigate(event.target.getAttribute('href'), { replace: false })
    }

    return (<div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <PageTitle title={"Детальная информация по домену"} />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="invoice-title">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <div className="mb-4">
                                                <span className="logo-txt">{domain.url}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="mb-4">
                                                <a href={"/edit/" + id} className="btn btn-primary w-md waves-effect waves-light" onClick={editClick}>Редактировать</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start" style={{ marginBottom: "10px" }}>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" onChange={moderationChange} checked={domain.Moderation} type="checkbox" name="moderation" id="flexSwitchCheckDefault" />
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Модерация</label>
                                        </div>
                                    </div>
                                    <p className="mb-1"><b>Дата создания:</b> {convertDate(Date.parse(domain.CreatedAt))}</p>
                                    <p className="mb-1"><b>Roistat:</b> {domain.Roistat ? "Да" : "Нет"}</p>
                                    <p className="mb-1"><b>Yandex:</b> {domain.yandex}</p>
                                    <p className="mb-1"><b>Google:</b> {domain.google}</p>
                                    <p className="mb-1"><b>Mail:</b> {domain.mail}</p>
                                    <p className="mb-1"><b>Facebook:</b> {domain.facebook}</p>
                                    <p className="mb-1"><b>Marquiz:</b> {domain.marquiz}</p>
                                    <p className="mb-1"><b>Qoopler:</b> {domain.Qoopler ? "Да" : "Нет"}</p>
                                    <p className="mb-1"><b>Datacon:</b> {domain.datacon ? "Да" : "Нет"}</p>
                                </div>
                                <hr className="my-4" />

                                <div className="py-2 mt-3">
                                    <h5 className="font-size-15">Шаги</h5>
                                </div>
                                <div className="p-4 border rounded">
                                    <div className="table-responsive">
                                        <table className="table table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "70px" }}>Номер</th>
                                                    <th>Название шага</th>
                                                    <th className="text-end" style={{ width: "120px" }}>Тип</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {domain.Steps.map((step, index) => <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <h5 className="font-size-15 mb-1">{step.title}</h5>
                                                        {step.answers ? <p className="font-size-13 text-muted mb-0">{step.answers.join(', ')}</p> : <p></p>}
                                                    </td>
                                                    <td className="text-end">{step.type}</td>
                                                </tr>)}
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


class DomainPageContainer extends Component {

    componentDidMount() {
    }

    render() {
        const { domain, loading, error, fetchDomain } = this.props;

        return <DomainDetail domain={domain} error={error} fetchDomain={fetchDomain} />;
    }
}

const mapStateToProps = ({ domainDetail: { domain, loading, error } }) => {
    return { domain, loading, error };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchDomain: fetchDomain(apiService),
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DomainPageContainer);