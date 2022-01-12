import React, { useEffect, useState } from "react"
import { GetJKList, generateParamsForUrl } from "../../utils/send-data"
import HoveredComponent from "../hovered-component"

const ResultStep = ({params, form, raionsStep, roomsStep, sdachaName, raionsPrice}) => {
    const [jkList, setJkList] = useState([])
    useEffect(async ()=>{
        let jklistPortal = await GetJKList(form, raionsStep, roomsStep, sdachaName, raionsPrice)
        if (jklistPortal!==false) {
            setJkList(jklistPortal)
        }
    },[])
    return (jkList.length==0?<React.Fragment>
                <div className="title_inner"><span style={{textTransform:"capitalize", display:"inline-block", position:"initial", fontSize: "46px", color:`#${params.main_color}`}}>{form.name}</span>, в ближайшее время с вами свяжется специалист и уточнит детали для расширенной подборки. Это бесплатно!</div>
            </React.Fragment>:<React.Fragment>
                <div className="title_inner">По вашим параметрам наиболее точно подходят квартиры в жилых комплексах</div>
                <ul className="jk_list" id="jk_res_list">
                    {jkList.map((jk, index) => index<4?<HoveredComponent params={params} text={jk.NAME} link={`https://${jk.domain}.g-n.ru/${jk.CODE}/${generateParamsForUrl(form)}`} />:"")}
                </ul>
                <div class="result_bottom_text" style={{color: `#${params.main_color}`}}>
                <span style={{textTransform:"capitalize", display:"inline-block", position:"initial"}}>{form.name}</span>, в ближайшее время с вами свяжется специалист и уточнит детали для расширенной подборки. Это бесплатно!
					</div>
            </React.Fragment>
    )
}

export default ResultStep