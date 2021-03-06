import React, { useEffect, useState } from "react"
import CityTitle from "../city-title"
import BtnComponent from "../btn-component";
import SliderStep from "./slider-step";
import TextStep from "./text-step";
import RoomsStep from "./rooms-step";
import axios from "axios";

const Step = ({ step, params, index, length, nextStep, prevStep, raionsStep, roomsStep, form, setForm, ignoreFirst }) => {
    const [prices, setPrices] = useState({min_value:3000000, max_value:15000000})
    const backBtn = (index, ignoreFirst) => {
        switch (index) {
            case 0:
                return ""
            case 1:
                if (ignoreFirst) {
                    return ""
                } else {
                    return <BtnComponent text={"Назад"} params={params} clickFunct={prevStep} />
                }
            default:
                return <BtnComponent text={"Назад"} params={params} clickFunct={prevStep} />
        }
    }

    useEffect(async ()=>{
        let response = await axios.get("/tmp_prices/"+domainSettings.city.ID)
        setPrices(response.data.payload)
    }, [])
    return (<div style={{ display: "block" }} className="page_main pages ">
        <div className="page">
            <div className="page_inner">
                <div className="wmain">
                    <CityTitle params={params} index={index} length={length} />
                    <div className="title_inner title_room">{step.title}</div>
                    {step.type == "text" || step.type == "raions" || step.type == "sdacha" ? <TextStep step={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : step.type == "rooms" ? <RoomsStep step={step} params={params} index={index} length={length} raionsStep={raionsStep} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} /> : <SliderStep prices={prices} step={step} raionsStep={raionsStep} roomsStep={roomsStep} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
                    <div className="btn_block">
                        {backBtn(index, ignoreFirst)}
                        <BtnComponent text={"Дальше"} params={params} clickFunct={nextStep} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}





export default Step