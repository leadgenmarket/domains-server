import axios from "axios"
import React, { useEffect, useState } from "react"
import { Edit, Trash } from "react-feather"
import { showModal } from "."
import { SpinnerContext } from "../spinner"
import { ChooseOptions, DatePickerInput } from "./components"

const TextModal = ({ form, sendRequest }) => {
    const [loading, setLoading] = useState(false)
    const closeModal = (e) => {
        e.preventDefault()
        if (form.clear !== false) clearFields(e)
        if (form.return !== undefined && document.querySelector('.' + form.return)) {
            document.querySelectorAll('.modal-dialog').forEach((modal) => {
                modal.style.display = "none"
            })
            document.querySelector('#inlineForm').classList.add('show')
            document.querySelector('.' + form.return).style.display = "flex"
        } else {
            document.querySelector('#inlineForm').style.display = "none"
            document.querySelector('#inlineForm').classList.remove('show')
            document.querySelector('body').classList.remove('modal-open')
            document.querySelectorAll('.modal-dialog').forEach((modal) => {
                modal.style.display = "none"
            })
            document.querySelector('.modal-backdrop').remove()
        }


    }

    const showResultModal = (flag) => {
        document.querySelectorAll('.modal-dialog').forEach((modal) => {
            modal.style.display = "none"
        })
        if (flag) {
            document.querySelector('.modal-success').style.display = "flex"
            setTimeout(() => {
                document.querySelector('.modal-success').classList.add('show')
            }, 100)
            document.querySelector('.modal-success .modal-content').style.display = "block"
        } else {
            document.querySelector('.modal-danger').style.display = "flex"
            setTimeout(() => {
                document.querySelector('.modal-danger').classList.add('show')
            }, 100)
            document.querySelector('.modal-danger .modal-content').style.display = "block"
        }
    }

    const checkFields = (event) => {
        const form_ = event.target.closest('form')
        let json = {}
        let attach = null
        let flag = true
        form_.querySelectorAll('input, select, textarea').forEach((element) => {
            if (element.type == 'file') {
                if (element.getAttribute('check') != 'false') {
                    if (element.files.length != 0) {
                        attach = element.files[0]
                        json = { ...json, files: element.files }
                        element.closest('.mb-2').classList.remove('error')
                        //element.closest('.row-center').querySelector('.image').classList.remove('error')
                        //element.closest('.row-center').parentNode.querySelector('.image-span').classList.remove('error')
                    } else {
                        flag = false
                        element.closest('.mb-2').classList.add('error')

                    }
                }
            } else if (element.type == 'hidden') {
                console.log(element)
                if (Number.isNaN(parseInt(element.value)) || element.getAttribute('name') == "ID" || element.getAttribute('name') == "site_id") {
                    json = { ...json, [element.getAttribute('name')]: element.value }
                } else {
                    json = { ...json, [element.getAttribute('name')]: parseInt(element.value) }
                }
                if (element.value == "") {
                    element.closest('.form-group').classList.add('error')
                    flag = false
                }
            } else if (element.type == 'number') {
                if (element.getAttribute('empty') !== "1") {
                    if (Number.isNaN(parseInt(element.value))) {
                        element.closest('.form-group').classList.add('error')
                        flag = false
                    } else {
                        element.closest('.form-group').classList.remove('error')
                        json = { ...json, [element.getAttribute('name')]: parseInt(element.value) }
                    }
                }
            } else if (element.type == 'textarea') {
                if (element.value == "") {
                    element.closest('.form-group').classList.add('error')
                    flag = false
                } else {
                    element.closest('.form-group').classList.remove('error')
                    json = { ...json, [element.getAttribute('name')]: element.value }
                }
            } else {
                if (element.value.trim().length == 0) {
                    element.closest('.form-group').classList.add('error')
                    flag = false
                } else {

                    element.closest('.form-group').classList.remove('error')
                    if (element.type == "select-one") {
                        if (element.value == "true") {
                            json = { ...json, [element.getAttribute('name')]: true }
                        } else if (element.value == "false") {
                            json = { ...json, [element.getAttribute('name')]: false }
                        } else {
                            if (element.getAttribute('name') !== "role") {
                                json = { ...json, [element.getAttribute('name')]: parseInt(element.value) }
                            } else {
                                json = { ...json, [element.getAttribute('name')]: element.value }
                            }
                        }
                    } else {
                        if (element.getAttribute('name').indexOf('time') !== -1) {
                            let date = new Date(Date.parse(element.value))
                            json = { ...json, [element.getAttribute('name')]: date.toISOString() }
                        } else {
                            json = { ...json, [element.getAttribute('name')]: element.value }
                        }

                    }
                }
            }
        })
        if (flag) {
            setLoading(true)

            //form.action(json)
            let flag = false
            if (form.fields.map((field) => {
                if (field.type == "file") {
                    flag = true
                }
            }))
                if (!flag) {
                    axios({
                        url: form.url,
                        method: form.type,
                        data: json,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }).then((response) => {
                        if (form.type == "put") json.ID = response.data.id
                        if (response.data.user != null) json.User = response.data.user
                        form.action(json)
                        setLoading(false)
                        if (form.clear !== false) clearFields(event)
                        if (form.return) {
                            showModal(form.return)
                        } else {
                            showResultModal(true)
                        }
                    }).catch((error) => {
                        console.log(error)
                        setLoading(false)
                        showResultModal(false)
                    })
                } else if (flag) {
                    const formData = new FormData();
                    Object.keys(json).map((name) => {
                        if (name != "files") {
                            formData.append(name, json[name]);
                        }
                    })
                    if (json.files != undefined && json.files.length > 0) {
                        Array.from(json.files).forEach(file => { formData.append('files', file) });
                    }
                    axios({
                        url: form.url,
                        method: form.type,
                        data: formData,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then((response) => {
                        if (form.type == "put") json.ID = response.data.id
                        form.action(json)
                        setLoading(false)
                        if (form.clear !== false) clearFields(event)
                        if (form.return) {
                            showModal(form.return)
                        } else {
                            showResultModal(true)
                        }
                    }).catch((error) => {
                        console.log(error)
                        setLoading(false)
                        if (form.return) {
                            showModal(form.return)
                        } else {
                            showResultModal(false)
                        }
                    });
                    /*
                    form.fields.map((field) => {
                        if (field.name!="files") {
                            formData.append(field.name, 'ADD');
                        }
                    })
                    formData.append('action', 'ADD');
                    formData.append('param', 0);
                    formData.append('secondParam', 0);
                    formData.append('file', new Blob(['test payload'], {
                    type: 'text/csv',
                    }));
                    */
                }

        }
    }

    const inputChange = (e) => {
        if (form.date != null) {
            for (let i = 0; i < Object.keys(form.date).length; i++) {
                let name = Object.keys(form.date)[i];
                if (name.toLowerCase() == e.target.name.toLowerCase()) {
                    form.edit({
                        ...form.date,
                        [name]: e.target.value
                    })
                    break;
                }
            }
        }
    }

    const generateFields = form.fields.map((field) => {
        if (field.type == "text" || field.type == "number") {
            let value = "";
            if (form.date != null) {

                for (let i = 0; i < Object.keys(form.date).length; i++) {
                    let name = Object.keys(form.date)[i];
                    if (name.toLowerCase() == field.json.toLowerCase()) {
                        value = form.date[name]
                        break;
                    }
                }
            }
            return <React.Fragment>
                <label>{field.name}:</label>
                <div className="form-group">
                    {value == "" ? <input className="form-control" type={field.type} id={field.name} name={field.json} empty={field.empty ? "1" : "0"} /> : <input className="form-control" onChange={inputChange} type={field.type} id={field.name} name={field.json} value={value} empty={field.empty ? "1" : "0"} />}
                    <div className="invalid-feedback">Проверьте правильность ввода поля.</div>
                </div>
            </React.Fragment>
        }



        if (field.type == "hidden") {
            let value = "";
            if (form.date != null) {
                for (let i = 0; i < Object.keys(form.date).length; i++) {
                    let name = Object.keys(form.date)[i];
                    if (name.toLowerCase() == field.json.toLowerCase()) {
                        value = form.date[name]
                        break;
                    }
                }
            }
            return <input name={field.json} type={field.type} value={value == "" ? field.value : value} />
        }

        if (field.type == "select") {
            let value = "";
            if (form.date != null) {
                for (let i = 0; i < Object.keys(form.date).length; i++) {
                    let name = Object.keys(form.date)[i];
                    if (name.toLowerCase() == field.json.toLowerCase()) {
                        value = form.date[name]
                        break;
                    }
                }
            }
            return <div className="form-group">
                <label for={field.json}>{field.name}</label>
                <select className="form-select custom-select" id={field.json} name={field.json}>
                    <option selected=""></option>
                    {field.options.map((option) => {
                        return value == option.value ? <option selected value={option.value}>{option.name}</option> : <option value={option.value}>{option.name}</option>
                    })}
                </select>
                <div className="invalid-feedback">Проверьте правильность ввода поля.</div>
            </div>
        }

        if (field.type == "textarea") {
            let value = "";
            if (form.date != null) {
                for (let i = 0; i < Object.keys(form.date).length; i++) {
                    let name = Object.keys(form.date)[i];
                    if (name.toLowerCase() == field.json.toLowerCase()) {
                        value = form.date[name]
                        break;
                    }
                }
            }
            return <div className="col-12" style={{ padding: 0 }}><div className="mb1 form-group">
                <label for={field.json}>{field.name}</label>
                {value != "" ? <textarea id={field.json} value={value} onChange={inputChange} name={field.json} className="form-control"></textarea> : <textarea id={field.json} name={field.json} className="form-control"></textarea>}
                <div className="invalid-feedback">Проверьте правильность ввода поля.</div>
            </div></div>
        }

        if (field.type == "date") {
            let value = "";
            if (form.date != null) {
                for (let i = 0; i < Object.keys(form.date).length; i++) {
                    let name = Object.keys(form.date)[i];
                    if (name.toLowerCase() == field.json.toLowerCase()) {
                        value = form.date[name]
                        break;
                    }
                }
            }
            return <DatePickerInput {...field} value={value} />
        }

        if (field.type == "choose") {
            console.log(field)
            return <ChooseOptions {...field} />
        }

        if (field.type == "file") {
            const imageContainerClick = (event) => {
                event.preventDefault()
                event.currentTarget.parentNode.querySelector('input[type="file"]').click()

            }
            const onImageChange = (event) => {
                event.preventDefault()
                event.target.setAttribute('check', 'true')
                event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.mb-2 img').setAttribute('src', URL.createObjectURL(event.target.files[0]))
            }

            const onImageDelete = (event) => {
                event.preventDefault()
                event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.mb-2 input[type="file"]').setAttribute('check', 'true')
                event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.mb-2 img').setAttribute('src', "/public/other/placeholder_image.jpg")
                event.currentTarget.parentNode.parentNode.parentNode.parentNode.querySelector('.mb-2 input[type="file"]').value = null
            }
            let image = ""
            if (form.date != null) {
                image = form.imageurl + "/" + form.date.ID + "/" + form.date.ID + ".jpg"
            }
            return <React.Fragment>
                <div className="form-group">
                    <label style={{ with: "100%" }}>{field.name}:</label>
                </div>
                <div className={field.wide != true ? "media mb-2" : "mb-2"} >
                    <a onClick={imageContainerClick}><img src={image != "" ? image : "/public/other/placeholder_image.jpg"} alt="тут могла быть фотка, но вы ее не загрузили..." className={field.wide == true ? "user-avatar users-avatar-shadow rounded mr-2 my-25 cursor-pointer wide-img" : "user-avatar users-avatar-shadow rounded mr-2 my-25 cursor-pointer"} width="150" height="150" />
                    </a>
                    <div className="media-body mt-50">
                        <div className="col-12 d-flex mt-1 px-0">
                            <label className="btn btn-primary mr-75 mb-0 waves-effect waves-float waves-light" hrmlFor="change-picture">
                                <span className="d-none d-sm-block"><Edit size="20" /> Изменить</span>
                                <input check={image != "" ? "false" : "true"} onChange={onImageChange} className="form-control" type="file" id="change-picture" accept="image/*" />
                                <span className="d-block d-sm-none">
                                    <Edit onClick={onImageChange} />
                                </span>
                            </label>
                            <button onClick={onImageDelete} className="btn btn-outline-primary d-none d-sm-block waves-effect"><Trash size="20" /> Удалить</button>
                            <button className="btn btn-outline-primary d-block d-sm-none waves-effect">
                                <Trash onClick={onImageDelete} />
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }
    })

    const btnSend = (e) => {
        checkFields(e)
    }

    const clearFields = (e) => {
        const form_ = document.querySelector('.' + form.name)
        form_.querySelectorAll('input, select, textarea').forEach((element) => {
            if (element.type == 'file') {
                element.value = null
                element.parentNode.parentNode.parentNode.parentNode.querySelector('img').setAttribute('src', "/public/other/placeholder_image.jpg")
            } else if (element.type == "text") {
                if (!element.value) {
                    element.value = ""
                }
            } else if (element.type == "hidden") {
                //element.value = ""
            } else {
                element.value = null
            }
        })
    }


    return (<React.Fragment ><div className={"modal-dialog modal-dialog-centered " + form.name} role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel33">{form.title}</h4><br />
                <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {form.subtitle != null ? <span style={{ paddingLeft: "1.5rem", paddingTop: "1rem" }} className="modal-title" id="myModalLabel33">{form.subtitle}</span> : <div></div>}

            {loading ? <SpinnerContext /> : ""}
            {form.question != null ? //для alertа вы действительно хотите удалить?
                <div>
                    <form action="#">
                        <div className="modal-body" style={{ textAlign: "center" }}>
                            <br />
                            <br />
                            <span style={{ fontSize: "18px" }}>{form.question}</span>
                            <br />
                            <br />
                            {generateFields}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary waves-effect waves-float waves-light" onClick={closeModal} data-dismiss="modal">Нет</button>
                            <button type="button" onClick={btnSend} className="btn btn-danger waves-effect waves-float waves-light" data-dismiss="modal">Да</button>
                        </div>
                    </form>
                </div> :
                <form action="#">
                    <div className="modal-body">
                        {generateFields}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary waves-effect waves-float waves-light" onClick={closeModal} data-dismiss="modal">Отмена</button>
                        <button type="button" onClick={btnSend} className="btn btn-primary waves-effect waves-float waves-light" data-dismiss="modal">Отправить</button>
                    </div>
                </form>}
        </div>
    </div>

    </ React.Fragment>

    )
}

export default TextModal