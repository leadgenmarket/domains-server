const Popups = () => {
  const closePopup = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.remove('overflow')
    document.querySelectorAll('.popups').forEach((popup) => {
      popup.style.display = "none"
    })
    document.querySelector('.popup_rgba').style.display = "none"
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
                <div class="form_tit">Узнайте прямо сейчас<br />стоимость квартир </div>
                <input type="tel" class="in_name ym-record-keys" placeholder="Введите имя" />
                <input type="tel" class="in_phone ym-record-keys" req="Y" placeholder="Введите номер телефона" />
                <input type="hidden" class="text" value="Узнать стоимость квартир в ЖК Горки Парк" />
                <button class="btn_form lead-btn" celtype="getFlatCoast" template="1">Узнать стоимость</button>
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