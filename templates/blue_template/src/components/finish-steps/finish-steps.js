import React, { useEffect, useState } from "react"
import CityTitle from "../city-title"

const FinishSteps = ({params}) => {
    const [stage, setStage] = useState(0)
    return <div class="page">
                <div class="page_inner">
                    <div class="wmain">
                        <CityTitle params={params}/>
                        {stage == 0?<Loading setStage={setStage} />:<div></div>}
                    </div>
                </div>
            </div>
		
}

const Loading = ({setStage}) => {
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
                <div class="progress">
                    <div class="progres_num" id="res_pers">{percent} %</div> <div class="progress_inner"><span class="wl_progress" style={{width: percent+"%"}}></span></div>
                </div>
                <div class="progress_result">Обработано <span id="tatal_cnt">{Math.round(maxCnt*percent/100)}</span> предложения</div>
            </React.Fragment>
}

export default FinishSteps