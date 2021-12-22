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
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
        console.log(form)
    }

    const nextStepClick = () => {
        setStep(step+1)
    }
    const prevStepClick = () => {
        setStep(step-1)
    }
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
                                                    <a href="#seller-details" class={step==1?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Seller Details">
                                                            <i class="feather-globe"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#company-document" class={step==2?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-airplay"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#company-document" class={step==3?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-list"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#company-document" class={step==4?"nav-link active":"nav-link"} data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-target"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                            <div class="tab-content twitter-bs-wizard-tab-content">
                                                <div class={step==1?"tab-pane active":"tab-pane"} id="seller-details">
                                                    <div class="text-center mb-4">
                                                        <h5>Информация о домене</h5>
                                                        <p class="card-title-desc">Заполните запрашиваемую информацию</p>
                                                    </div>
                                                    <form>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label for="basicpill-firstname-input" name="url" class="form-label">Доменное имя (без http)</label>
                                                                    <input type="text" onChange={inputChange} className="form-control" id="basicpill-firstname-input" name="url" value={form.url}/>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label for="basicpill-lastname-input" className="form-label">Шаблон</label>
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
                                                    <ul class="pager wizard  twitter-bs-wizard-pager-link">
                                                        <li class="next"><a onClick={nextStepClick} class="btn btn-primary" onclick="nextTab()">Далее <i class="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class={step==2?"tab-pane active":"tab-pane"} id="company-document">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Внешнее отображение</h5>
                                                            <p class="card-title-desc">Заполните запрашиваемую информацию</p>
                                                        </div>
                                                        <form>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-pancard-input" class="form-label">Город</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="city_id" value={form.city_id}>
                                                                            <option></option>
                                                                            {cities.map((city) => {
                                                                                return <option value={city.ID}>{city.Name}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-vatno-input" class="form-label">Организация</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="organization_id" value={form.organization_id}>
                                                                            <option></option>
                                                                            {organizations.map((organization) => {
                                                                                return <option value={organization.id}>{organization.Name}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-cstno-input" id="upload-background" class="form-label">
                                                                            Фоновая картинка
                                                                        </label>
                                                                        <input type="file" class="form-control" id="basicpill-cstno-input" />
                                                                        <div class="col-lg-12 d-flex">
                                                                            <input onClick={(event)=>{document.querySelector("#upload-background").click()}} type="text" disabled class="form-control" id="basicpill-cstno-input" />
                                                                            <button className="btn btn-primary" onClick={(event)=>{event.preventDefault(); document.querySelector("#upload-background").click()}}>Загрузить</button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Главный цвет (прим. FF0000)</label>
                                                                        <input type="text" class="form-control" name="main_color" id="basicpill-servicetax-input" onChange={inputChange} value={form.main_color} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-companyuin-input" class="form-label">Вторичный цвет (прим. FF0000)</label>
                                                                        <input type="text" class="form-control" name="secondary_color" onChange={inputChange} value={form.secondary_color} id="basicpill-companyuin-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a onClick={prevStepClick} class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a onClick={nextStepClick} class="btn btn-primary" onclick="nextTab()">Далее <i class="feather-arrow-right"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class={step==3?"tab-pane active":"tab-pane"} id="company-document">
                                                    <StepsComponent quizSteps={quizSteps} setQuizSteps={setQuizSteps} />
                                                    <ul class="pager wizard twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a onClick={prevStepClick} class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a onClick={nextStepClick} class="btn btn-primary" onclick="nextTab()">Далее <i class="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class={step==4?"tab-pane active":"tab-pane"} id="company-document">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Метрики</h5>
                                                            <p class="card-title-desc">Заполните информацию по метрикам <br /><b style={{color:"white"}}>!! только идентификаторы счетчиков !!</ b></p>
                                                        </div>
                                                        <form>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Yandex</label>
                                                                        <input type="text" class="form-control" name="yandex" onChange={inputChange} id="basicpill-servicetax-input" value={form.yandex} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Google</label>
                                                                        <input type="text" class="form-control" name="google" onChange={inputChange} id="basicpill-servicetax-input" value={form.google} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Mail</label>
                                                                        <input type="text" class="form-control" name="mail" onChange={inputChange} id="basicpill-servicetax-input" value={form.mail} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Roistat</label>
                                                                        <input type="text" class="form-control" name="roistat" onChange={inputChange} id="basicpill-servicetax-input" value={form.roistat} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Marquiz</label>
                                                                        <input type="text" class="form-control" name="marquiz" onChange={inputChange} id="basicpill-servicetax-input" value={form.marquiz} />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <label for="basicpill-servicetax-input" class="form-label">Qoopler</label>
                                                                    <select onChange={inputChange} className="form-select custom-select" id="template" name="qoopler" value={form.qoopler}>
                                                                            <option>Нет</option>
                                                                            <option value="y">Да</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a onClick={prevStepClick} class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a onClick={nextStepClick} class="btn btn-primary" onclick="nextTab()">Сохранить <i class="feather-check"></i></a></li>
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