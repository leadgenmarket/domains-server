import React from "react"

const ResultStep = ({params, form}) => {
    return (<React.Fragment>
                <div className="title_inner"><span style={{textTransform:"capitalize", display:"inline-block", position:"initial", fontSize: "46px", color:`#${params.main_color}`}}>{form.name}</span>, в ближайшее время с вами свяжется специалист и уточнит детали для расширенной подборки. Это бесплатно!</div>
            </React.Fragment>
    )
}

export default ResultStep

 {/*<div className="title_inner">По вашим параметрам наиболее точно подходят квартиры в жилых комплексах</div>
                <ul className="jk_list" id="jk_res_list">
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                    <HoveredComponent params={params} text={"Цветной город"} link={"https://spb.g-n.ru/zhk-tsvetnoy-gorod/?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99"} />
                </ul>*/}