import PageTitle from "../../page-title"
import { compose } from "../../../utils";
import { withApiService } from "../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom'
import { Component, useEffect, useState } from "react";
import { fetchPrices, updatePricesList } from "../../../actions/prices";
import { Spinner } from "../../spinner";
import axios from "axios";
import ApiService from "../../../services/api-service";
import { toast } from "react-toastify";

const PricesPage = ({ prices, loading, updatePricesList }) => {
    const [citiesList, setList] = useState([])

    const [form, setForm] = useState([])
    useEffect(() => {
        new ApiService().citiesList().then((resp)=>{
            setList(resp.data)
            
        })
        setForm(prices)
    }, [prices])

    const convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(' / ')
    }

    const getCityById =(cityID) =>{
        let name = ""
        citiesList.forEach((city)=>{
            if (city.ID == cityID) {
                name = city.Name
            }
        })
        return name
    }

    const inputChange = (e) => {
        e.preventDefault()
        let id = e.currentTarget.getAttribute('data')
        let name = e.currentTarget.getAttribute('name')
        let value = parseInt(e.target.value)
        setForm((prevState) => {
            let newState = []
            prevState.forEach((price)=>{
                if (price.ID == id){
                    if (name == "min") {
                        price.min_price = value
                    } else {
                        price.max_price = value
                    }
                }
                newState.push(price)
            })
            return newState
        })
    }

    const saveClick =(e) =>{
        e.preventDefault()
        let promise = new ApiService().updatePricesList(form)

        toast.promise(
            promise,
            {
                pending: 'Сохраняю данные',
                success: 'Данные успешно сохраненны 👌',
                error: 'Ошибка при сохранении данных 🤯'
            }
        )
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
                                                <span className="logo-txt">Цены в слайдерах по районам</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="mb-4">
                                                <a href="#" onClick={saveClick} className="btn btn-primary w-md waves-effect waves-light">Сохранить</a>
                                            </div>
                                        </div>
                                    </div>
                                    <form>
                                        {form.map((price)=>{
                                            return(
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-firstname-input" name="url" className="form-label">{getCityById(price.city_id)} от</label>
                                                            <input type="text" className="form-control" id="basicpill-firstname-input" name="min" onChange={inputChange} data={price.ID} value={price.min_price}  />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-firstname-input" name="url" className="form-label">до</label>
                                                            <input type="text" className="form-control" id="basicpill-firstname-input" name="max" onChange={inputChange} data={price.ID} value={price.max_price}  />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        
                                    </form>
                                </div>
                                <hr className="my-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


class PricesPageContainer extends Component {

    componentDidMount() {
        this.props.fetchPrices()
    }

    render() {
        const { list, loading, error, fetchPrices, updatePricesList } = this.props;

        if (loading || list == null) {
            return <Spinner />
        }

        return <PricesPage prices={list} error={error} fetchPrices={fetchPrices} updatePricesList={updatePricesList} />;
    }
}

const mapStateToProps = ({ pricesList: { list, loading, error } }) => {
    return { list, loading, error };
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchPrices: fetchPrices(apiService),
        updatePricesList: updatePricesList(apiService)
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(PricesPageContainer);