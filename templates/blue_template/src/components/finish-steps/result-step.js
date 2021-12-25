import React from "react"
import HoveredComponent from "../hovered-component"

const ResultStep = ({params}) => {
    return (<React.Fragment>
                <div className="title_inner">По вашим параметрам наиболее точно подходят квартиры в жилых комплексах</div>
                <ul className="jk_list" id="jk_res_list">
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                </ul>
                <div className="result_bottom_text" style={{color:`#${params.main_color}`}}>
                    <span style={{textTransform:"capitalize"}} id="client_name">test</span>, в ближайшее время с вами свяжется специалист и уточнит детали для расширенной подборки. Это бесплатно!
                </div>
            </React.Fragment>
    )
}

export default ResultStep