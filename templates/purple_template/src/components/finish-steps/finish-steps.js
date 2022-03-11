import React, { useEffect, useState } from "react"
import StepTitle from "../step-title"
import NameStep from "./name-step"
import PhoneStep from "./phone-step"
import ResultStep from "./result-step"

const FinishSteps = ({ params, form, setForm, raionsPrice, raionsStep, roomsStep, sdachaName }) => {
    const [stage, setStage] = useState(0)
    const nextStep = (event) => {
        event.preventDefault()
        setStage(stage + 1)
    }
    return <section style={{ display: "block" }} className="container_main">
        <section className="main_wm h100">
            <div className="sect_wm">
                {stage === 0 ? <Loading params={params} setStage={setStage} /> : stage === 1 ? <PhoneStep params={params} raionsStep={raionsStep} roomsStep={roomsStep} sdachaName={sdachaName} nextStep={nextStep} form={form} setForm={setForm} /> : stage === 2 ? <NameStep raionsStep={raionsStep} roomsStep={roomsStep} sdachaName={sdachaName} params={params} nextStep={nextStep} form={form} setForm={setForm} /> : <ResultStep params={params} raionsPrice={raionsPrice} raionsStep={raionsStep} roomsStep={roomsStep} sdachaName={sdachaName} form={form} />}
            </div>
            {stage < 3 ? <div class="step_dec act"></div> : ""}
        </section>
    </section>

}

const Loading = ({ setStage, params }) => {
    const [percent, setPercent] = useState(0)
    const maxCnt = 12785
    useEffect(() => {
        setTimeout(() => {
            if (percent < 100) {
                if (percent + 3 > 100) {
                    setPercent(100)
                } else {
                    setPercent(percent + 3)
                }
            } else {
                setStage(1)
            }
        }, 70);
    }, [percent])

    const hexToRgbA = (hex) => {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
        }
        throw new Error('Bad Hex');
    }
    return <React.Fragment>
        <div class="data_step m_step loading_step act" id="loadingStep">
            <div class="ms_title">Подбираются варианты</div>
            <div class="progress">
                <div className="progress_inner"><span class="wl_progress" style={{ width: `${percent}%` }}></span></div>
                <div class="progres_num" id="res_pers">{percent}%</div>
                <div class="progress_result">Обработано <span id="tatal_cnt">{Math.round(maxCnt * percent / 100)}</span> предложений</div>
            </div>
        </div>
    </React.Fragment>
}


export default FinishSteps