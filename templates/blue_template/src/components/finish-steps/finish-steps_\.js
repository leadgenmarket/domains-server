import React, { useEffect, useState } from "react"
import CityTitle from "../city-title"
import ProgressSvg from "../progress-svg"
import NameStep from "./name-step"
import PhoneStep from "./phone-step"
import ResultStep from "./result-step"

const FinishSteps = ({params}) => {
    const [stage, setStage] = useState(0)
    const nextStep = (event) => {
        event.preventDefault()
        setStage(stage+1)
    }
    return <div class="page">
                <div class="page_inner">
                    <div class="wmain">
                        <CityTitle params={params}/>
                        {stage == 0?<Loading params={params} setStage={setStage} />:stage==1?<PhoneStep params={params} nextStep={nextStep}/>:stage==2?<NameStep params={params} nextStep={nextStep} />:<ResultStep params={params} />}
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
    return <React.Fragment>
                <div class="title_inner title_inner2"> 
                    Подбираются варианты.<i>Система подбирает подходящие варианты</i>
                </div>
                <div style={{color:params.main_color}} class="progress">
                    <div style={{color:`#${params.main_color}`}} class="progres_num" id="res_pers">{percent} %</div> 
                    <div className="progress_inner"><ProgressSvg fill={params.main_color}/></div>
                    {/* <div class="progress_inner"><span style={{backgroundColor:`#${params.main_color}`}} class="wl_progress" style={{width: percent+"%"}}></span></div> */}
                </div>
                <div class="progress_result">Обработано <span id="tatal_cnt">{Math.round(maxCnt*percent/100)}</span> предложения</div>
            </React.Fragment>
}

export default FinishSteps