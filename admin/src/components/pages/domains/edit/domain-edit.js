import { useEffect, useState, Component } from "react";
import { useNavigate, useParams } from "react-router-dom"
import PageTitle from "../../../page-title"
import ApiService from "../../../../services/api-service";
import StepsComponent from "./steps";
import { compose } from "../../../../utils";
import { toast } from "react-toastify";
import { withApiService } from "../../../hoc";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addDomainToList } from "../../../../actions/domains";
import Dropzone from "react-dropzone";
import { Modals, } from "../../../modals";

const DomainEdit = ({ addDomainToList }) => {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [templates, setTemplates] = useState([])
    const [cities, setCities] = useState([])
    const [organizations, setOrganzations] = useState([])
    const [file, setFile] = useState(null)
    const [photos, setPhotos] = useState([])
    const [advantages, setAdvantages] = useState([
        {
            name: "",
            image: null,
        },
        {
            name: "",
            image: null,
        },
        {
            name: "",
            image: null,
        },
        {
            name: "",
            image: null,
        },
        {
            name: "",
            image: null,
        },
        {
            name: "",
            image: null,
        }
    ])

    const [plans, setPlans] = useState([])
    const [planToAdd, setPlanToAdd] = useState({})

    const addPlanSubmit = (plan) => {
        setPlans([...plans, planToAdd])
        setPlanToAdd(() => { return {} })
        document.querySelector('#inlineForm').style.display = "none"
        document.querySelector('#inlineForm').classList.remove('show')
        document.querySelector('body').classList.remove('modal-open')
        document.querySelector('.modal-backdrop').remove()
    }

    const [step, setStep] = useState(1)
    const [quizSteps, setQuizSteps] = useState([])
    const { id } = useParams()
    const [form, setForm] = useState({})

    useEffect(() => {
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
        //если задан id, то значит что это страница edit и нужно получить инфу о редактриуемом домене
        if (id !== undefined && Object.keys(form) == 0) {
            apiService.domain(id).then((resp) => {
                resp.data.qoopler = resp.data.Qoopler
                resp.data.roistat = resp.data.Roistat
                delete resp.data.Qoopler
                delete resp.data.Roistat
                setForm(resp.data)
                setQuizSteps(resp.data.Steps)
            }).catch((err) => {
                //тут надо редирект на 404
            })
        }
    }, [])
    useEffect(() => {
        if (type != "") {

        }
    }, [type])
    const inputChange = (event) => {
        if (event.target.name == "qoopler" || event.target.name == "roistat") {
            let flag = false
            if (event.target.value == "1") {
                flag = true
            }
            setForm({
                ...form,
                [event.target.name]: flag
            })
        } else {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        }
    }

    const nextStepClick = () => {
        setStep(step + 1)
    }
    const prevStepClick = () => {
        setStep(step - 1)
    }

    const stepsSaveClick = (event) => {
        form["steps"] = quizSteps
        var bodyFormData = new FormData()
        Object.keys(form).map((key) => {
            if (key == "steps") {
                bodyFormData.append(key, JSON.stringify(form[key]))
            } else {
                bodyFormData.append(key, form[key])
            }
        })
        if (file != null) {
            bodyFormData.append('file', file)
        }

        let jsonAdv = []
        advantages.forEach((advantage) => {
            if (advantage.image != null && advantage.image != undefined) {
                bodyFormData.append('advantages_photos[]', advantage.image)
                jsonAdv.push({ ...advantage, image: advantage.image.name })
            }
        })
        bodyFormData.append("advantages", JSON.stringify(jsonAdv))
        photos.forEach((photo) => {
            bodyFormData.append('photos[]', photo)
        })

        let jsonPlans = []
        plans.forEach((plan) => {
            if (plan.image != null && plan.image != undefined) {
                bodyFormData.append('plan_photos[]', plan.image)
                jsonPlans.push({ ...plan, image: plan.image.name })
            }
        })
        bodyFormData.append('plans', JSON.stringify(jsonPlans))
        let apiService = new ApiService

        let promise = apiService.domainSave(bodyFormData)

        toast.promise(
            promise,
            {
                pending: 'Сохраняю данные',
                success: 'Данные успешно сохраненны 👌',
                error: 'Ошибка при сохранении данных 🤯'
            }
        )
        promise.then((data) => {
            //addDomainToList(data)
            navigate('/', { replace: true })
        })
    }

    const fileInputChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }
    const photosDropZoneChange = (acceptedFiles) => {
        setPhotos([...photos, ...acceptedFiles])
    }
    const advantagesInputChange = (event) => {
        let id = parseInt(event.currentTarget.getAttribute('data')) - 1
        setAdvantages((old) => {
            let newAdvantages = [...old];
            newAdvantages[id].image = event.target.files[0];
            return newAdvantages
        })
    }

    const advantagesInputTextChange = (event) => {
        let id = parseInt(event.currentTarget.getAttribute('data')) - 1
        setAdvantages((old) => {
            let newAdvantages = [...old];
            newAdvantages[id].name = event.target.value;
            return newAdvantages
        })
    }

    const plansFileChange = (event) => {
        if (event.target.files.length > 0) {
            setPlanToAdd({ ...planToAdd, image: event.target.files[0] })
        }
    }
    const planAddInput = (event) => {
        setPlanToAdd(() => {
            return { ...planToAdd, [event.target.name]: event.target.value }
        })
    }

    const showModal = (modal) => {
        document.querySelector('#inlineForm').style.display = "block"
        document.querySelector('body').classList.add('modal-open')
        if (!document.querySelector('.modal-backdrop')) {
            var backdrop = document.createElement("div");
            backdrop.classList.add('modal-backdrop')
            backdrop.classList.add('fade')
            backdrop.classList.add('show')
        }
        let element = document.createElement("div")
        element.setAttribute("id", "shadow")
        element.classList.add('modal-backdrop')
        element.classList.add('fade')
        element.classList.add('show')
        document.querySelector('body').appendChild(element)
        setTimeout(() => {
            document.querySelector('#inlineForm').classList.add('show')
            //document.querySelector('.' + modal).style.display = "flex"
        }, 200)
        //document.querySelector('.' + modal).style.display = "flex"
    }

    const closeModal = (e) => {
        e.preventDefault()
        if (form.return !== undefined && document.querySelector('.' + form.return)) {
            document.querySelector('#inlineForm').classList.add('show')
            document.querySelector('.' + form.return).style.display = "flex"
        } else {
            document.querySelector('#inlineForm').style.display = "none"
            document.querySelector('#inlineForm').classList.remove('show')
            document.querySelector('body').classList.remove('modal-open')
            document.querySelector('.modal-backdrop').remove()
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
                                            <a href="#seller-details" className={step == 1 ? "nav-link active" : "nav-link"} data-toggle="tab">
                                                <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Seller Details">
                                                    <i className="feather-globe"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#company-document" className={step == 2 ? "nav-link active" : "nav-link"} data-toggle="tab">
                                                <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                    <i className="feather-airplay"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#company-document" className={step == 3 ? "nav-link active" : "nav-link"} data-toggle="tab">
                                                <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                    <i className="feather-list"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#company-document" className={step == 4 ? "nav-link active" : "nav-link"} data-toggle="tab">
                                                <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                    <i className="feather-git-branch"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#company-document" className={step == 5 ? "nav-link active" : "nav-link"} data-toggle="tab">
                                                <div className="step-icon" data-bs-toggle="tooltip" data-bs-placement="top" title="Company Document">
                                                    <i className="feather-target"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content twitter-bs-wizard-tab-content">
                                        <div className={step == 1 ? "tab-pane active" : "tab-pane"} id="seller-details">
                                            <div className="text-center mb-4">
                                                <h5>Информация о домене</h5>
                                                <p className="card-title-desc">Заполните запрашиваемую информацию</p>
                                            </div>
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-firstname-input" name="url" className="form-label">Доменное имя (без http)</label>
                                                            <input type="text" onChange={inputChange} className="form-control" id="basicpill-firstname-input" name="url" value={form.url} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-lastname-input" className="form-label">Шаблон</label>
                                                            <select onChange={inputChange} className="form-select custom-select" id="template" name="template_id" value={form.template_id}>
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
                                        <div className={step == 2 ? "tab-pane active" : "tab-pane"} id="company-document">
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
                                                                        return <option value={organization.id}>{organization.name}</option>
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
                                                                    <input onClick={(event) => { document.querySelector("#upload-background").click() }} value={file != null ? file.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-background").click() }}>Загрузить</button>
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
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Подзаголовок</label>
                                                                <input type="text" className="form-control" name="sub_title" onChange={inputChange} value={form.sub_title} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Преимущества подбора (после подзаголовка идет)</label>
                                                                <input type="text" className="form-control" name="sub_title_items" onChange={inputChange} value={form.sub_title_items} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Номер на сайте</label>
                                                                <input type="text" className="form-control" name="phone" onChange={inputChange} value={form.phone} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Тайтл шага с вводом номера телефона</label>
                                                                <input type="text" className="form-control" name="phone_step_title" onChange={inputChange} value={form.phone_step_title} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Заголовок блока быстрого поиска перед футером</label>
                                                                <input type="text" className="form-control" name="footer_title" onChange={inputChange} value={form.footer_title} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Тайтл финального шага, текст после имени</label>
                                                                <input type="text" className="form-control" name="result_step_text" onChange={inputChange} value={form.result_step_text} id="basicpill-companyuin-input" />
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
                                        <div className={step == 3 ? "tab-pane active" : "tab-pane"} id="company-document">
                                            <StepsComponent quizSteps={quizSteps} setQuizSteps={setQuizSteps} city_id={form.city_id} />
                                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                <li className="prev"><a onClick={prevStepClick} className="btn btn-primary"><i className="feather-arrow-left"></i> Назад </a></li>
                                                <li className="next"><a onClick={nextStepClick} className="btn btn-primary">Далее <i className="feather-arrow-right"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className={step == 4 ? "tab-pane active" : "tab-pane"} id="company-document">
                                            <div>
                                                <div className="text-center mb-4">
                                                    <h5>Доп параметры шаблона</h5>
                                                    <p className="card-title-desc">Заполните запрашиваемую информацию</p>
                                                </div>
                                                <div className="text-center mb-4">
                                                    <h6>Преимущества</h6>
                                                </div>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-companyuin-input" className="form-label">Тайтл блока</label>
                                                                <input type="text" className="form-control" name="advantages_title" onChange={inputChange} value={form.advantages_title} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage1-input" id="upload-advantage1" className="form-label">
                                                                    Преимущество 1 - Картинка
                                                                </label>
                                                                <input data="1" type="file" onChange={advantagesInputChange} className="form-control" name="advantage1" id="upload-advantage1-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input data="1" onClick={(event) => { document.querySelector("#upload-advantage1").click() }} value={advantages[0].image != null ? advantages[0].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage1").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="1" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage1" value={advantages[0].name.length > 0 ? advantages[0].name : ""} key="adv_text_1" id="adv_text_1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage2-input" id="upload-advantage2" className="form-label">
                                                                    Преимущество 2 - Картинка
                                                                </label>
                                                                <input data="2" type="file" onChange={advantagesInputChange} className="form-control" name="advantage2" id="upload-advantage2-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input onClick={(event) => { document.querySelector("#upload-advantage2").click() }} value={advantages[1].image != null ? advantages[1].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage2").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="2" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage2" value={advantages[1].name} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage3-input" id="upload-advantage3" className="form-label">
                                                                    Преимущество 3 - Картинка
                                                                </label>
                                                                <input data="3" type="file" onChange={advantagesInputChange} className="form-control" name="advantage3" id="upload-advantage3-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input onClick={(event) => { document.querySelector("#upload-advantage3").click() }} value={advantages[2].image != null ? advantages[2].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage3").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="3" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage3" value={advantages[2].name} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage4-input" id="upload-advantage4" className="form-label">
                                                                    Преимущество 4 - Картинка
                                                                </label>
                                                                <input data="4" type="file" onChange={advantagesInputChange} className="form-control" name="advantage4" id="upload-advantage4-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input onClick={(event) => { document.querySelector("#upload-advantage4").click() }} value={advantages[3].image != null ? advantages[3].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage4").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="4" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage4" value={advantages[3].name} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage5-input" id="upload-advantage5" className="form-label">
                                                                    Преимущество 5 - Картинка
                                                                </label>
                                                                <input data="5" type="file" onChange={advantagesInputChange} className="form-control" name="advantage5" id="upload-advantage5-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input onClick={(event) => { document.querySelector("#upload-advantage5").click() }} value={advantages[4].image != null ? advantages[4].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage5").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="5" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage5" value={advantages[4].name} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-advantage6-input" id="upload-advantage6" className="form-label">
                                                                    Преимущество 6 - Картинка
                                                                </label>
                                                                <input data="6" type="file" onChange={advantagesInputChange} className="form-control" name="advantage6" id="upload-advantage6-input" />
                                                                <div className="col-lg-12 d-flex">
                                                                    <input onClick={(event) => { document.querySelector("#upload-advantage6").click() }} value={advantages[5].image != null ? advantages[5].image.name : ""} type="text" disabled className="form-control" id="basicpill-cstno-input" />
                                                                    <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-advantage6").click() }}>Загрузить</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="upload-background-input" id="upload-background" className="form-label">
                                                                    Название
                                                                </label>
                                                                <input data="6" type="text" className="form-control" onChange={advantagesInputTextChange} name="advantage6" value={advantages[5].name} id="basicpill-companyuin-input" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                                <div className="text-center mb-4" style={{ marginTop: "20px" }}>
                                                    <h6>Картинки ЖК (Ход строительства)</h6>
                                                    <p className="card-title-desc">Перетащите картинки в контейнер</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-companyuin-input" className="form-label">Тайтл блока</label>
                                                            <input type="text" className="form-control" name="photos_title" onChange={inputChange} value={form.photos_title} id="basicpill-companyuin-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Dropzone onDrop={photosDropZoneChange}>
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div className="dropzone dz-clickable dz-started" {...getRootProps()}>
                                                            <div class="dz-message needsclick" style={{ display: "flex", paddingTop: "60px", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                                <div class="mb-3">
                                                                    <i className="feather-upload-cloud"></i>
                                                                </div>
                                                                <input {...getInputProps()} />
                                                                {photos.length > 0 ? <span style={{ fontSize: "20px", textAlign: "center" }}>{photos.length + " файлa(-ов) на загрузку"}</span> : ""}
                                                                <span style={{ fontSize: "20px", textAlign: "center" }}>Перетащите картинки в контейнер или нажмите чтобы загрузить.</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </ Dropzone>
                                                <div className="text-center mb-4" style={{ marginTop: "20px", position: "relative", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                                    <h6>Планировки</h6>
                                                    <a onClick={() => { showModal('addPlan') }} style={{ position: "absolute", right: 0 }} className="btn btn-primary"><i className="feather-plus" ></i> Добавить </a>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="basicpill-companyuin-input" className="form-label">Тайтл блока</label>
                                                            <input type="text" className="form-control" name="plans_title" onChange={inputChange} value={form.plans_title} id="basicpill-companyuin-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    {plans.length > 0 ? plans.map((plan) => {
                                                        return <div class="col-md-6 col-xl-3">
                                                            <div class="card">
                                                                <img class="card-img-top img-fluid" src={URL.createObjectURL(plan.image)} alt="Card image cap" />
                                                                <div class="card-body">
                                                                    <h4 class="card-title">{plan.title}</h4>
                                                                </div>
                                                                <ul class="list-group list-group-flush">
                                                                    <li class="list-group-item">Общая площадь - {plan.info} м<sup>2</sup></li>
                                                                    <li class="list-group-item">Жилая площадь - {plan.zhil} м<sup>2</sup></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    }) : <span style={{ width: "100%", textAlign: "center" }}>Список пока пуст...</span>}

                                                </div>
                                                <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                    <li className="prev"><a onClick={prevStepClick} className="btn btn-primary"><i className="feather-arrow-left"></i> Назад </a></li>
                                                    <li className="next"><a onClick={nextStepClick} className="btn btn-primary">Далее <i className="feather-arrow-right"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={step == 5 ? "tab-pane active" : "tab-pane"} id="company-document">
                                            <div>
                                                <div className="text-center mb-4">
                                                    <h5>Метрики</h5>
                                                    <p className="card-title-desc">Заполните информацию по метрикам <br /><b style={{ color: "white" }}>!! только идентификаторы счетчиков !!</ b></p>
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
                                                                <label htmlFor="basicpill-servicetax-input" className="form-label">Facebook</label>
                                                                <input type="text" className="form-control" name="facebook" onChange={inputChange} id="basicpill-servicetax-input" value={form.facebook} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-servicetax-input" className="form-label">MyTarget</label>
                                                                <input type="text" className="form-control" name="mytarget" onChange={inputChange} id="basicpill-servicetax-input" value={form.mytarget} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="basicpill-servicetax-input" className="form-label">VK</label>
                                                                <input type="text" className="form-control" name="vk" onChange={inputChange} id="basicpill-servicetax-input" value={form.vk} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="basicpill-servicetax-input" className="form-label">Qoopler</label>
                                                            <select onChange={inputChange} className="form-select custom-select" id="template" name="qoopler" value={form.qoopler == true ? "1" : "0"}>
                                                                <option value="0">Нет</option>
                                                                <option value="1">Да</option>
                                                            </select>
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
                                                            <label htmlFor="basicpill-servicetax-input" className="form-label">Roistat</label>
                                                            <select onChange={inputChange} className="form-select custom-select" id="template" name="roistat" value={form.roistat == true ? "1" : "0"}>
                                                                <option value="0">Нет</option>
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
        <div class="modal" style={{ display: "none" }} id="inlineForm" tabindex="-1" aria-labelledby="myModalLabel33" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-danger" style={{ display: "block !important" }}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel33">Добавить планировку</h4>
                        <br />
                        <button type="button" onClick={closeModal} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div></div>
                    <form action="#">
                        <div class="modal-body">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="upload-plans-input" className="form-label">
                                        Картинка
                                    </label>
                                    <input type="file" onChange={plansFileChange} className="form-control" name="plan" id="upload-plans-input" />
                                    <div className="col-lg-12 d-flex">
                                        <input onClick={(event) => { document.querySelector("#upload-plans-input").click() }} value={planToAdd.image != null ? planToAdd.image.name : ""} type="text" disabled className="form-control" id="upload-plans-input" />
                                        <button className="btn btn-primary" onClick={(event) => { event.preventDefault(); document.querySelector("#upload-plans-input").click() }}>Загрузить</button>
                                    </div>
                                </div>
                            </div>
                            <label>Тайтл:</label>
                            <div class="form-group">
                                <input class="form-control" onChange={planAddInput} type="text" value={planToAdd.title != null ? planToAdd.title : ""} id="Тайтл" name="title" />
                                <div class="invalid-feedback">Проверьте правильность ввода поля.</div>
                            </div>
                            <label>Общая площадь:</label>
                            <div class="form-group">
                                <input class="form-control" onChange={planAddInput} value={planToAdd.info != null ? planToAdd.info : ""} type="text" id="Общая площадь" name="info" />
                                <div class="invalid-feedback">Проверьте правильность ввода поля.</div>
                            </div>
                            <label>Жилая площадь:</label>
                            <div class="form-group">
                                <input class="form-control" onChange={planAddInput} value={planToAdd.zhil != null ? planToAdd.zhil : ""} type="text" id="Жилая площадь" name="zhil" />
                                <div class="invalid-feedback">Проверьте правильность ввода поля.</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-primary waves-effect waves-float waves-light" data-dismiss="modal" onClick={closeModal}>Отмена</button>
                            <button type="button" class="btn btn-primary waves-effect waves-float waves-light" onClick={addPlanSubmit}>Отправить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div >)
}

class DomainEditPageContainer extends Component {

    render() {
        const { addDomainToList } = this.props;

        return <DomainEdit addDomainToList={addDomainToList} />;
    }
}

const mapStateToProps = ({ }) => {
    return {};
};

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        addDomainToList: addDomainToList,
    }, dispatch);
};

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DomainEditPageContainer);