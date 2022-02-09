import { useEffect, useState } from "react"

const PlansComponent = () => {
  const [show, setShow] = useState(3)
  const [plans, setPlans] = useState([])
  useEffect(() => { setPlans(domainSettings.domain.Plans) }, [domainSettings])

  const showPopup = (e) => {
    e.preventDefault()

    document.querySelector('body').classList.add('overflow')
    document.querySelectorAll('.popups').forEach((popup) => {
      popup.style.display = "none"
    })
    document.querySelector('.popup_rgba').style.display = "block"
    document.querySelector('.popup_plan').style.display = "block"
    let id = parseInt(e.currentTarget.getAttribute('data-id'))
    let plan = plans[id]
    document.querySelector('.popup_plans .pu_title span').innerHTML = plan.title
    document.querySelector('.img_kv').setAttribute('src', "https://admin.leadactiv.ru/file-store/" + plan.image)
    document.querySelector('.popups .text').value = "Узнать стоимость " + plan.title
    console.log(plan)
  }
  return (<section class="jk_dev">
    <div class="tm">{domainSettings.domain.PlansTitle}</div>
    <div class="jkd_list">
      <ul class="plans_list">
        {Object.keys(plans).map((key) => {
          let plan = plans[key]
          if (key < show) {
            return <li class="rommsL actkv r_0" onClick={showPopup} data-id={key} style={{ display: "inline-block" }}>
              <p>{plan.title}</p>
              <div class="jk_pl_img show_popup" data-popup="popup_plan" data-id="1"><img src={"https://admin.leadactiv.ru/file-store/" + plan.image} /></div>
              <div class="jk_inn">
                <a href="#" onClick={showPopup} class="jk_btn show_popup" data-popup="popup_plan" data-id={key}>Узнать стоимость</a>
              </div>
            </li>
          }
        })}
      </ul>
      {show < plans.length ? <a href="#" onClick={(e) => { e.preventDefault(); setShow(show + 3) }} class="btn_more jkd_list_btn" id="loadflats" page="1">Показать ещё</a> : ""}
    </div>
  </section>
  )
}

export default PlansComponent