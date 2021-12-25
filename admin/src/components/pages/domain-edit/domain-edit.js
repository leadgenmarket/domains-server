import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PageTitle from "../../page-title"
import ApiService from "../../../services/api-service";
import StepsComponent from "./steps";

const DomainEdit = () => {
    const navigate= useNavigate();
    const [type, setType] = useState("");
    const [templates, setTemplates] = useState([])
    const [cities, setCities] = useState([])
    const [organizations, setOrganzations] = useState([])
    const [file, setFile] = useState(null)
    const [step, setStep] = useState(1)
    const [quizSteps, setQuizSteps] = useState([])
    const [form, setForm] = useState({
        url: "",
        template_id: "",
    }) 
    useEffect(()=>{
        let apiService = new ApiService
        apiService.templatesList().then((response) => {
            setTemplates(response.data)
        })
        apiService.citiesList().then((response) => {
            setCities(response.data)
        })
        apiService.organizationsList().then((response) => {
            setOrganzations(response.data)
        })
    },[])
    useEffect(()=> {
        if (type != "") {

        }
    },[type])
    const inputChange = (event) => {
        if (event.target.name == "qoopler") {
            let flag = false
            if (event.target.value == "1") {
                flag = true
            }
            setForm({
                ...form,
                [event.target.name]:flag
            })
        } else {
            setForm({
                ...form,
                [event.target.name]:event.target.value
            })
        }
        console.log(form)
    }

    const nextStepClick = () => {
        setStep(step+1)
    }
    const prevStepClick = () => {
        setStep(step-1)
    }

    const stepsSaveClick = (event) => {
        form["steps"] = quizSteps
        var bodyFormData = new FormData()
        Object.keys(form).map((key) => {
            if (key =="steps") {
                bodyFormData.append(key, JSON.stringify(form[key]))
            } else {
                bodyFormData.append(key,form[key])
            }
        })
        if (file!=null) {
            bodyFormData.append('file', file)
        }
        console.log(file)
        let apiService = new ApiService
        apiService.domainSave(bodyFormData)
    }

    const fileInputChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    return (<div className="main-content">
            <div className="page-content">
                    <div className="container-fluid">
                        <PageTitle title="Добавление домена" />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div id="basic-pills-wizard" className="twitter-bs-wizard">
                                            <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                                                <li className="nav-item">
                                                    <a href="#seller-details" className={step==1?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Seller Details">
                                                            <i className="feather-globe"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#company-document" className={step==2?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i className="feather-airplay"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#company-document" className={step==3?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i className="feather-list"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#company-document" className={step==4?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i className="feather-target"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                            <div className="tab-content twitter-bs-wizard-tab-content">
                                                <div className={step==1?"tab-pane active":"tab-pane"} id="seller-details">
                                                    <div className="text-center mb-4">
                                                        <h5>Информация о домене</h5>
                                                        <p className="card-title-desc">Заполните запрашиваемую информацию</p>
                                                    </div>
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="basicpill-firstname-input" name="url" className="form-label">Доменное имя (без http)</label>
                                                                    <input type="text" onChange={inputChange} className="form-control" id="basicpill-firstname-input" name="url" value={form.url}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="mb-3">
                                                                    <label htmlFor="basicpill-lastname-input" className="form-label">Шаблон</label>
                                                                    <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" name="template_id" value={form.template_id}>
                                                                        <option></option>
                                                                        {templates.map((template) => {
                                                                            return <option value={template.ID}>{template.Name}</option>
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <ul className="pager wizard  twitter-bs-wizard-pager-link">
                                                        <li className="next"><a onClick={nextStepClick} className="btn btn-primary">Далее <i className="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div className={step==2?"tab-pane active":"tab-pane"} id="company-document">
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Внешнее отображение</h5>
                                                            <p className="card-title-desc">Заполните запрашиваемую информацию</p>
                                                        </div>
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-pancard-input" className="form-label">Город</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="city_id" value={form.city_id}>
                                                                            <option></option>
                                                                            {cities.map((city) => {
                                                                                return <option value={city.ID}>{city.Name}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-vatno-input" className="form-label">Организация</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="organization_id" value={form.organization_id}>
                                                                            <option></option>
                                                                            {organizations.map((organization) => {
                                                                                return <option value={organization.id}>{organization.Name}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                            Фоновая картинка
                                                                        </label>
                                                                        <input type="file" onChange={fileInputChange} className="form-control" id="upload-background-input" />
                                                                        <div className="col-lg-12 d-flex">
                                                                            <input onClick={(event)=>{document.querySelector("#upload-background").click()}} value={file!=null?file.name:""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                            <button className="btn btn-primary" onClick={(event)=>{event.preventDefault(); document.querySelector("#upload-background").click()}}>Загрузить</button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Главный цвет (прим. FF0000)</label>
                                                                        <input type="text" className="form-control" name="main_color" id="basicpill-servicetax-input" onChange={inputChange} value={form.main_color} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-companyuin-input" className="form-label">Вторичный цвет (прим. FF0000)</label>
                                                                        <input type="text" className="form-control" name="secondary_color" onChange={inputChange} value={form.secondary_color} id="basicpill-companyuin-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                            <li className="prev"><a onClick={prevStepClick} className="btn btn-primary"><i className="feather-arrow-left"></i> Назад </a></li>
                                                            <li className="next"><a onClick={nextStepClick} className="btn btn-primary">Далее <i className="feather-arrow-right"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className={step==3?"tab-pane active":"tab-pane"} id="company-document">
                                                    <StepsComponent quizSteps={quizSteps} setQuizSteps={setQuizSteps} city_id={form.city_id} />
                                                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                            <li className="prev"><a onClick={prevStepClick} className="btn btn-primary"><i className="feather-arrow-left"></i> Назад </a></li>
                                                            <li className="next"><a onClick={nextStepClick} className="btn btn-primary">Далее <i className="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div className={step==4?"tab-pane active":"tab-pane"} id="company-document">
                                                    <div>
                                                        <div className="text-center mb-4">
                                                            <h5>Метрики</h5>
                                                            <p className="card-title-desc">Заполните информацию по метрикам <br /><b style={{color:"white"}}>!! только идентификаторы счетчиков !!</ b></p>
                                                        </div>
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Yandex</label>
                                                                        <input type="text" className="form-control" name="yandex" onChange={inputChange} id="basicpill-servicetax-input" value={form.yandex} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Google</label>
                                                                        <input type="text" className="form-control" name="google" onChange={inputChange} id="basicpill-servicetax-input" value={form.google} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Mail</label>
                                                                        <input type="text" className="form-control" name="mail" onChange={inputChange} id="basicpill-servicetax-input" value={form.mail} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Roistat</label>
                                                                        <input type="text" className="form-control" name="roistat" onChange={inputChange} id="basicpill-servicetax-input" value={form.roistat} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="basicpill-servicetax-input" className="form-label">Marquiz</label>
                                                                        <input type="text" className="form-control" name="marquiz" onChange={inputChange} id="basicpill-servicetax-input" value={form.marquiz} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <label htmlFor="basicpill-servicetax-input" className="form-label">Qoopler</label>
                                                                    <select onChange={inputChange} className="form-select custom-select" id="template" name="qoopler" value={form.qoopler}>
                                                                            <option  value="0">Нет</option>
                                                                            <option value="1">Да</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul className="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li className="prev"><a onClick={prevStepClick} className="btn btn-primary"><i className="feather-arrow-left"></i> Назад </a></li>
                                                            <li className="next"><a onClick={stepsSaveClick} className="btn btn-primary">Сохранить <i className="feather-check"></i></a></li>
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