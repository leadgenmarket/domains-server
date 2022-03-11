import React from "react"
import BtnComponent from "../btn-component";
import SliderStep from "./slider-step";
import TextStep from "./text-step";
import RoomsStep from "./rooms-step";
import StepTitle from "../step-title";

const Step = ({ step, params, index, length, nextStep, prevStep, raionsStep, roomsStep, form, setForm, ignoreFirst }) => {

    const backBtn = (index, ignoreFirst) => {
        switch (index) {
            case 0:
                return ""
            case 1:
                if (ignoreFirst) {
                    return false
                } else {
                    return true
                }
            default:
                return true
        }
    }
    return (<section style={{ display: "block" }} className="container_main">
        <section className="main_wm h100">
            <div className="sect_wm">
                <div className="data_step mw_step district_step act">
                    <StepTitle params={params} title={step.title} index={index} length={length} showBack={backBtn(index, ignoreFirst)} prevStep={prevStep} />
                    {step.type == "text" || step.type == "raions" || step.type == "sdacha" ? <TextStep step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : step.type == "rooms" ? <RoomsStep step={step} params={params} index={index} length={length} raionsStep={raionsStep} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : <SliderStep step={step} raionsStep={raionsStep} roomsStep={roomsStep} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
                    <BtnComponent text={"Дальше"} params={params} clickFunct={nextStep} />
                </div>
            </div>
            <div class="step_dec"></div>
        </section>
    </section>
    )
}





export default Step