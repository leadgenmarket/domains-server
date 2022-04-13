import React, { useEffect, useState } from "react"
import BtnComponent from "../btn-component";
import SliderStep from "./slider-step";
import TextStep from "./text-step";
import RoomsStep from "./rooms-step";
import StepTitle from "../step-title";
import axios from "axios";

const Step = ({ step, params, index, length, nextStep, prevStep, raionsStep, roomsStep, form, setForm, ignoreFirst }) => {
    const [prices, setPrices] = useState({min_value:3000000, max_value:15000000})
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

    useEffect(async ()=>{
        let response = await axios.get("/tmp_prices/"+domainSettings.city.ID)
        setPrices(response.data.payload)
    })
    return (<section style={{ display: "block" }} className="container_main">
        <section className="main_wm h100" style={{ background: params.background != "" ? `url("https://admin.leadactiv.ru/file-store/${params.background}") center / cover no-repeat` : `` }}>
            <div className="sect_wm">
                <div className="data_step mw_step district_step act">
                    <StepTitle params={params} title={step.title} index={index} length={length} showBack={backBtn(index, ignoreFirst)} prevStep={prevStep} />
                    {step.type == "text" || step.type == "raions" || step.type == "sdacha" ? <TextStep step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : step.type == "rooms" ? <RoomsStep step={step} params={params} index={index} length={length} raionsStep={raionsStep} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : <SliderStep step={step} prices={prices} raionsStep={raionsStep} roomsStep={roomsStep} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
                    <BtnComponent text={"Дальше"} params={params} clickFunct={nextStep} analog={true} />
                </div>
            </div>
            <div class="step_dec"></div>
        </section>
    </section>
    )
}





export default Step