import axios from "axios"
import { useEffect, useState } from "react"
import BtnComponent from "../btn-component"
import CityTitle from "../city-title"
import LocationPin from "../location-pin"

const MainScreen = ({params, nextStep}) => {
    return <div className="container_main" style={{backgroundImage: `url("http://localhost:8080/file-store/${params.background}")`}}>
                <div style={{display: "block"}} className="page_main">
                <div className="page page_1">
                    <div className="page_inner">
                        <div className="wmain">
                            <CityTitle params={params} />
                            <h1>Недорогие новостройки</h1>
                            <div className="sub_title">Здесь собрана полная база квартир, более 30 000 вариантов. <br />За 1 минуту вы получите бесплатный доступ к самым выгодным предложениям!</div>
                            <BtnComponent text={"Начать быстрый поиск"} params={params} clickFunct={nextStep}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default MainScreen