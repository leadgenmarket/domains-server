import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PageTitle from "../../page-title"
import ApiService from "../../../services/api-service";

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
    }

    const nextStepClick = () => {
        if (form.url!="" && form.template_id!="") {
            setStep(step+1)
        }
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
                                                <li class="nav-item">
                                                    <a href="#company-document" class="nav-link" data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-list"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#company-document" class="nav-link" data-toggle="tab">
                                                        <div class="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                            <i class="feather-target"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                            <div class="tab-content twitter-bs-wizard-tab-content">
                                                <div class="tab-pane" id="seller-details">
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
                                                        <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Далее <i class="feather-arrow-right"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="tab-pane" id="company-document">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Главные настройки</h5>
                                                            <p class="card-title-desc">Заполните запрашиваемую информацию</p>
                                                        </div>
                                                        <form>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-pancard-input" class="form-label">Город</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" name="city_id" value={form.template_id}>
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
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" name="template_id" value={form.template_id}>
                                                                            <option></option>
                                                                            {organizations.map((organization) => {
                                                                                return <option value={organization.ID}>{organization.Name}</option>
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
                                                                        <input type="text" class="form-control" name="main_color" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-companyuin-input" class="form-label">Вторичный цвет (прим. FF0000)</label>
                                                                        <input type="text" class="form-control" name="secondary_color" id="basicpill-companyuin-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Сохранить <i class="feather-check"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="company-document">
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
                                                                        <input type="text" class="form-control" name="yandex" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Google</label>
                                                                        <input type="text" class="form-control" name="google" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Mail</label>
                                                                        <input type="text" class="form-control" name="mail" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Roistat</label>
                                                                        <input type="text" class="form-control" name="roistat" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Marquiz</label>
                                                                        <input type="text" class="form-control" name="marquiz" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <label for="basicpill-servicetax-input" class="form-label">Qoopler</label>
                                                                    <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" name="qoopler" value={form.template_id}>
                                                                            <option>Нет</option>
                                                                            <option value="y">Да</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <ul class="pager wizard
                                                            twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Сохранить <i class="feather-check"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="tab-pane active" id="company-document">
                                                    <div>
                                                        <div class="text-center mb-4">
                                                            <h5>Шаги</h5>
                                                            <p class="card-title-desc">Заполните шаги (или оставьте стандартные)</p>
                                                        </div>
                                                        <div>
                                                            <div class="row">
                                                                <div class="mb-3">
                                                                    Шаг 1 / 5
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Текст вопроса</label>
                                                                        <input type="text" class="form-control" name="mail" id="basicpill-servicetax-input" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-3">
                                                                        <label for="basicpill-servicetax-input" class="form-label">Тип шага</label>
                                                                        <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" name="qoopler" value={form.template_id}>
                                                                                <option value="text">Текстовый</option>
                                                                                <option value="slider">Слайдер</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr class="my-4"></hr>
                                                        <div class="d-flex justify-content-center">
                                                            <button href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="feather-plus"></i> Добавить шаг </button>
                                                        </div>
                                                        <ul class="pager wizard twitter-bs-wizard-pager-link">
                                                            <li class="prev"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()"><i class="feather-arrow-left"></i> Назад </a></li>
                                                            <li class="next"><a href="javascript: void(0);" class="btn btn-primary" onclick="nextTab()">Сохранить <i class="feather-check"></i></a></li>
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