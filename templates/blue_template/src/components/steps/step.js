import React from "react"
import CityTitle from "../city-title"
import BtnComponent from "../btn-component";
import SliderStep from "./slider-step";
import TextStep from "./text-step";

const Step = ({ step, params, index, length, nextStep, prevStep, form, setForm }) => {  
    return (<div style={{ display: "block" }} className="page_main pages ">
        <div className="page">
            <div className="page_inner">
                <div className="wmain">
                    <CityTitle params={params} index={index} length={length} />
                    <div className="title_inner title_room">{step.title}</div>
                    {step.type == "text" ? <TextStep step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} /> : <SliderStep step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} />}
                     <div className="btn_block">
                        {index > 1 ? <BtnComponent text={"Назад"} params={params} clickFunct={prevStep}/> : ""}
                        <BtnComponent text={"Дальше"} params={params} clickFunct={nextStep}/>
                      </div>
                </div>
            </div>
        </div>
    </div>
    )
}





export default Step