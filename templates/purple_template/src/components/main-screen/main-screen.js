import React from "react"
import BtnComponent from "../btn-component"
import CityTitle from "../step-title"
import parse from 'html-react-parser'

const MainScreen = ({ params, nextStep }) => {
    return <React.Fragment>
        <section class="main_wm h100" style={{ background: params.background != "" && params.background !== undefined ? `url("https://admin.leadactiv.ru/file-store/${params.background}") center / cover no-repeat` : `url("https://admin.leadactiv.ru/templates/purple_template/build/img/main_bg.jpg") center / cover no-repeat` }}>
            <div class="sect_wm">

                <div class="data_step main_page act" id="main_page">
                    <div class="m_subtit"> Сервис по подбору квартир - более <span>50 000</span> предложений! </div>
                    <h1 class="">{params.title == "" ? "Недорогие новостройки" : params.title}</h1>
                    <div className="m_list">{params.sub_title === undefined || params.sub_title == "" ? parse("<span> - ипотека от 6,1%</span><span> - квартиры с отделкой и без</span><span> - акции, скидки, спецпредложения</span>") : parse(params.sub_title)}</div>
                    <BtnComponent text={"Начать быстрый поиск"} params={params} clickFunct={nextStep} />
                </div>
            </div>
            <div class="step_dec"></div>
        </section>
    </React.Fragment>
}



export default MainScreen