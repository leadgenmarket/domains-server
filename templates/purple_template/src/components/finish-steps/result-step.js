import React, { useEffect, useState } from "react"
import { GetJKList, generateParamsForUrl } from "../../utils/send-data"
import HoveredComponent from "../hovered-component"

const ResultStep = ({ params, form, raionsStep, roomsStep, sdachaName, raionsPrice }) => {
    const [jkList, setJkList] = useState([])
    useEffect(async () => {
        let jklistPortal = await GetJKList(form, raionsStep, roomsStep, sdachaName, raionsPrice)
        if (jklistPortal !== false) {
            setJkList(jklistPortal)
        }
    }, [])
    return (jkList.length == 0 ? <React.Fragment>
        <div className="data_step m_step jk_step viewed act">
            <div class="call_back"><span><l id="client_name">{form.name}</l></span>, в ближайшее время с Вами свяжется специалист и уточнит детали для расширенной подборки. <div class="free">Это бесплатно!</div><img class="call_back_ico" src="img/call_back_ico.png" alt="" /></div>
            <div class="ms_title">По Вашим параметрам подходят квартиры в жилых комплексах:</div>
        </div>
    </React.Fragment> : <div className="data_step m_step jk_step viewed act">
        <div class="call_back"><span><l id="client_name">{form.name}</l></span>, в ближайшее время с Вами свяжется специалист и уточнит детали для расширенной подборки. <div class="free">Это бесплатно!</div><img class="call_back_ico" src="img/call_back_ico.png" alt="" /></div>
        <div class="ms_title">По Вашим параметрам подходят квартиры в жилых комплексах:</div>
        <div className="jk_scroll">
            <ul className="jk_list" id="jk_res_list">
                {jkList.map((jk, index) => index < 4 ? <HoveredComponent params={params} text={jk.NAME} photo={jk.photo} count={jk.flats_cnt} link={`https://${jk.domain}.g-n.ru/${jk.CODE}/${generateParamsForUrl(form)}`} /> : "")}
            </ul>
        </div>
    </div>
    )
}

export default ResultStep