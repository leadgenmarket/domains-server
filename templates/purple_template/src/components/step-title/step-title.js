import LocationPin from "../location-pin"

const StepTitle = ({ params, index, length, title, showBack, prevStep }) => {
    return (
        <div className="step_title">{showBack ? <div onClick={prevStep} class="back_btn"></div> : ""}{title == "Укажите максимальную стоимость квартиры, выше которой вы не готовы рассматривать предложения" ? "Укажите максимальную стоимость квартиры" : title} <span class="step_ident">Шаг {domainSettings.rayon === "" ? index + 1 : index}/{domainSettings.rayon !== "" ? length - 1 : length}</span></div>
    )
}

export default StepTitle