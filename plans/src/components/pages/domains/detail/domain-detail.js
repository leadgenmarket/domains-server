import PageTitle from "../../../page-title"
import { compose } from "../../../../utils";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom'
import { Component, useEffect, useState } from "react";
import { fetchDomain } from "../../../../actions/domain-detail";
import { Spinner } from "../../../spinner";
import { Modals, showModal } from "../../../modals"

const DomainDetail = ({ domain, plans, loading, fetchDomain }) => {
    const { id } = useParams()
    const [editPlan, setEditPlan] = useState({})
    useEffect(() => {
        fetchDomain(id)
    }, [id])

    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(' / ')
    }

    if (loading || domain == null) {
        return <Spinner />
    }

    const forms = [
        {
            title: 'Добавить планировку',
            name: 'addPlan',
            url: "/api/plans/",
            type: "put",
            action: (action) => { console.log('need to close modal'); fetchDomain() },
            fields: [
                {
                    name: 'Фото',
                    json: 'file',
                    type: 'file'
                },
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
                {
                    name: 'Количество комнат',
                    json: 'rooms',
                    type: 'number'
                },
                {
                    name: 'Общая площадь',
                    json: 'total_area',
                    type: 'number'
                },
                {
                    name: 'Жилая площадь',
                    json: 'living_area',
                    type: 'number'
                },
                {
                    name: 'Этажи (через запятую, если несколько)',
                    json: 'floors',
                    type: 'text'
                },
                {
                    json: 'site_id',
                    type: 'hidden',
                    value: id,
                },
                //акционная квартира или нет
                {
                    json: 'action',
                    type: 'select',
                    //value: id,
                },
                {
                    name: 'Цена',
                    json: 'price',
                    type: 'number'
                },
                {
                    name: 'Площадь гостинной',
                    json: 'living_area',
                    type: 'number'
                },
                {
                    name: 'Площадь спальни',
                    json: 'bed_room_area',
                    type: 'number'
                },
                {
                    name: 'Площадь кухни',
                    json: 'kitchen_area',
                    type: 'number'
                },
            ],
        },
        {
            title: 'Редактировать планировку',
            name: 'updatePlan',
            url: "/api/plans/",
            type: "post",
            action: (action) => { console.log(action); fetchDomain() },
            edit: (action) => { setEditPlan(action) },
            //imageurl:"public/objects/"+activeObject.ID+"/actions/", //id
            date: editPlan,
            clear: false,
            fields: [
                {
                    name: 'Фото',
                    json: 'file',
                    type: 'file'
                },
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
            title: 'Удалить планировку',
            question: 'Вы действительно хотите удалить домен?',
            name: 'deletePlan',
            url: "/api/plans/" + editPlan.ID,
            type: "delete",
            action: (action) => { console.log(action); fetchDomain() },
            //edit: () => {},
            date: editPlan,
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
                                                <a href="#" className="btn btn-primary w-md waves-effect waves-light" onClick={(e) => { e.preventDefault(); showModal('addPlan') }}>Добавить планировку</a>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-1"><b>Название:</b> {domain.Name}</p>
                                    <p className="mb-1"><b>Url:</b> {domain.URL}</p>
                                    <p className="mb-1"><b>Количество планировок:</b> {plans.length}</p>
                                </div>
                                <hr className="my-4" />

                                <div className="py-2 mt-3">
                                    <h5 className="font-size-15">Планировки</h5>
                                </div>
                                <div className="row">
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


class DomainPageContainer extends Component {

    componentDidMount() {
    }

    render() {
        const { domain, plans, loading, error, fetchDomain } = this.props;

        return <DomainDetail domain={domain} plans={plans} error={error} fetchDomain={fetchDomain} />;
    }
}

const mapStateToProps = ({ domainDetail: { domain, plans, loading, error } }) => {
    return { domain, plans, loading, error };
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