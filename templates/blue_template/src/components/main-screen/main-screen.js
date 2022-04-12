import React from "react"
import BtnComponent from "../btn-component"
import CityTitle from "../city-title"
import parse from 'html-react-parser'

const MainScreen = ({ params, nextStep }) => {
    return <React.Fragment>
                                                                                {/*убрать после эксперимента*/}
        <div style={{ display: "block" }} className="page_main" onClick={domainSettings.domain.url=="piter-noviydom.ru"?()=>{nextStep()}:()=>{}}>
            <div className="page page_1">
                <div className="page_inner">
                    <div className="wmain" >
                        <CityTitle params={params} />
                        <h1>{params.title == "" ? "Недорогие новостройки" : params.title}</h1>
                        <div className="sub_title">{params.sub_title === undefined || params.sub_title == "" ? parse("Здесь собрана полная база квартир, более 30 000 вариантов. <br />За 1 минуту вы получите бесплатный доступ к самым выгодным предложениям!") : parse(params.sub_title)}
                            {domainSettings.domain.sub_title_items === undefined || domainSettings.domain.sub_title_items == '' ? "" :
                                <React.Fragment>
                                    <br />
                                    <ul class="header_list">{parse(domainSettings.domain.sub_title_items)}</ul>
                                </React.Fragment>}
                        </div>
                        <BtnComponent text={"Начать быстрый поиск"} params={params} clickFunct={nextStep} />
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default MainScreen