import "./popups.css"
import InputMask from 'react-input-mask'
import { useState } from "react"
import { SendData } from "../../utils/send-data"
import BtnComponent from "../btn-component"

const Popups = ({ params }) => {
  const [form, setForm] = useState({})
  const [error, setError] = useState(false)
  const [phone, setPhone] = useState("")
  const closePopup = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.remove('overflow')
    document.querySelectorAll('.popups').forEach((popup) => {
      popup.style.display = "none"
    })
    document.querySelector('.popup_rgba').style.display = "none"
  }

  const inputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const sendForm = (e) => {
    e.preventDefault()
    let celtype = "getFlatCoast"
    console.log(form)
    SendData(form, () => { }, () => { }, "", "", "", celtype)
  }

  return (<div class="popup_rgba popups" id="popup_rgba" style={{ display: "none" }}>
    <div class="popup_table">
      <div class="popup_cell">
        <div class="popup_main popup_jk popups" style={{ display: "none" }} id="popup_ok">
          <a href="#" class="closeform" onClick={closePopup}></a>
          <div class="pu_title"><span>В ближайшее время с вами свяжется специалист.</span></div>
        </div>
        <div class="popup_main popup_plans popup_plan popups" id="popup_pl"><a href="#" class="closeform" onClick={closePopup}></a>
          <div class="pu_title"> <span>ЖК "Горки Парк"</span></div>
          <div class="pu_plans_in">
            <div class="pu_plans_img">
              <img class="img_kv" src="img/jks/2.jpg" />
            </div>
            <div class="pu_pl_info">
              <form class="form_style">
                <div class="form_tit" style={{ color: `#${params.main_color}` }}>Узнайте прямо сейчас<br />стоимость квартир </div>
                <input type="tel" class="in_name ym-record-keys" name="name" onChange={inputChange} value={form.name} placeholder="Введите имя" />
                <InputMask mask="+7\ (999) 999-99-99" onChange={inputChange} name="phone" value={form.phone} onChange={inputChange} maskChar={null} >
                  {(inputProps) => <input type="tel" className={error ? "in_phone ym-record-keys err" : "in_phone ym-record-keys"}  {...inputProps} placeholder="+7 ( ___ ) ___ - __ - __" />}
                </InputMask>
                <BtnComponent
                  text={'Узнать стоимость'}
                  params={params}
                  clickFunct={sendForm}
                  celtype="getFlatCoast"
                />
              </form>
            </div>
          </div>
          <div class="clr"></div>
        </div>
      </div>
    </div>
  </div>)
}

export default Popups