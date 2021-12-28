import React, { useEffect, useState } from "react"
import CityTitle from "../city-title"
import NameStep from "./name-step"
import PhoneStep from "./phone-step"
import ResultStep from "./result-step"

const FinishSteps = ({params, form, setForm, raionsStep, roomsStep, sdachaName}) => {
    const [stage, setStage] = useState(0)
    const nextStep = (event) => {
        event.preventDefault()
        setStage(stage+1)
    }
    return <div className="page">
                <div className="page_inner">
                    <div className="wmain">
                        <CityTitle params={params}/>
                        {stage === 0?<Loading params={params} setStage={setStage} />:stage===1?<PhoneStep params={params} raionsStep={raionsStep} roomsStep={roomsStep} sdachaName={sdachaName} nextStep={nextStep} form={form} setForm={setForm} />:stage===2?<NameStep raionsStep={raionsStep} roomsStep={roomsStep} sdachaName={sdachaName} params={params} nextStep={nextStep} form={form} setForm={setForm} />:<ResultStep params={params} form={form} />}
                    </div>
                </div>
            </div>
		
}

const Loading = ({setStage, params}) => {
    const [percent, setPercent] = useState(0)
    const maxCnt = 12785
    useEffect(()=>{
        setTimeout(() => {
            if (percent<100) {
                if (percent+3>100) {
                    setPercent(100)
                } else {
                    setPercent(percent+3)
                }
            } else {
                setStage(1)
            }
        }, 50);
    }, [percent])

    const hexToRgbA = (hex) => {
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length=== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
        throw new Error('Bad Hex');
    }
    return <React.Fragment>
                <div className="title_inner title_inner2"> 
                    Подбираются варианты.<i>Система подбирает подходящие варианты</i>
                </div>
                <div style={{color:params.main_color}} className="progress">
                    <div style={{color:`#${params.main_color}`}} className="progres_num" id="res_pers">{percent} %</div> 
                    <div className="progress_inner" style={{background: `linear-gradient(94deg, ${hexToRgbA("#"+params.main_color)} ${percent}%, rgba(35,53,63,1) 0%, rgba(35,53,63,1) 100%)`}}></div>
                </div>
                <div className="progress_result">Обработано <span id="tatal_cnt">{Math.round(maxCnt*percent/100)}</span> предложения</div>
            </React.Fragment>
}

export default FinishSteps