import React, { useEffect } from "react"
import parse from 'html-react-parser'
import { SendFilter, SetUniqID } from "../../utils/send-data"

const MainScreen = ({ params, nextStep, rooms, setRooms, sroks, setSroks, number, price, setPrice }) => {

    const updateList = (item, slice, callback, type) => {
        let newSlice = []
        if (slice.includes(item)) {
            slice.forEach(itemS => {
                if (itemS != item) {
                    newSlice.push(itemS)
                }
            });
        } else {
            newSlice = [...slice, item]
        }
        callback(newSlice)
        if (type) {
            updateTitlePrice(newSlice)
            SendFilter(sroks, newSlice, number)
        } else {
            SendFilter(newSlice, rooms, number)
        }
        SetUniqID()
    }

    const getTitle = () => {
        if (domainSettings.title == "") {
            return "Новостройки"
        } else {
            return domainSettings.title.split("|")[0]
        }
    }

    const getMinimalPrice = () => {
        let min = 9999999999999
        let prices = domainSettings.prices.prices[0]
        for (let i = 0; i < 6; i++) {
            if (prices["min_" + i] < min && prices["min_" + i] != 0) {
                min = prices["min_" + i]
            }
        }
        return min
    }

    const getPriceOfType = (type) => {
        let prices = domainSettings.prices.prices[0]
        if (prices["min_" + type] != 0) {
            if (prices["min_" + type] >= getMinimalPrice()) {
                return prices["min_" + type]
            } else {
                return getMinimalPrice()
            }
        }
        else {
            return getMinimalPrice()
        }
    }

    const checkIfExists = (type) => {
        let prices = domainSettings.prices.prices[0]
        if (prices["min_" + type] > 0) {
            return true
        }
        return false
    }

    const getCity = () => {
        /*switch (domainSettings.city.Name) {
            case "Краснодар":
                return "в Краснодаре"
        }*/
        let city = "в " + domainSettings.city.Name + "e"
        if (domainSettings.city.Name[domainSettings.city.Name.length - 1] == "а") {
            city = "в " + domainSettings.city.Name.slice(0, [domainSettings.city.Name.length - 1]) + "е"
        }

        return city
    }

    const updateTitlePrice = (roomsList) => {
        let price = 999999999999999
        if (roomsList.length > 0) {
            for (let i = 0; i < 6; i++) {
                if (roomsList.includes(i.toString())) {
                    let newPrice = Math.round(getPriceOfType(i.toString()) * 10) / 10
                    console.log(newPrice)
                    if (price > newPrice) {
                        price = newPrice
                    }
                }
            }
        } else {
            let prices = domainSettings.prices.prices[0]
            price = Math.round(getMinimalPrice() * 10) / 10
        }
        setPrice(price)
    }

    return <React.Fragment>
        <div className="content">
            <div className="page_one">
                <div className="content_title">
                    {getTitle()} <br /><img src="/templates/wa_template/build/img/title_street_ico.png" /><span>{getCity()}</span><div className="head_price">от {price} млн  ₽</div>
                </div>
                <div className="get">
                    Получите самые выгодные <br />предложения уже <span>через 7 секунд</span>
                </div>

                <ul className="filtr_list">
                    <li> <div className="fl_title">Выберите количество комнат</div>
                        <ul className="fl_inner_list fl_room " id="kv_list">
                            {checkIfExists("0") ? <li><a className={rooms.includes("0") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("0", rooms, setRooms, true) }} href="#">Студия</a></li> : ""}
                            {checkIfExists("1") ? <li><a className={rooms.includes("1") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("1", rooms, setRooms, true) }} href="#">1к</a></li> : ""}
                            {checkIfExists("2") ? <li><a className={rooms.includes("2") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("2", rooms, setRooms, true) }} href="#">2к</a></li> : ""}
                            {checkIfExists("3") ? <li><a className={rooms.includes("3") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("3", rooms, setRooms, true) }} href="#">3к</a></li> : ""}
                        </ul>
                    </li>
                    <li>
                        <div className="fl_title">Год сдачи объекта</div>
                        <ul className="fl_inner_list " id="sroki_list">
                            <li><a className={sroks.includes("2022") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("2022", sroks, setSroks, false) }} href="#">2022</a></li>
                            <li><a className={sroks.includes("2023") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("2023", sroks, setSroks, false) }} href="#">2023</a></li>
                            <li><a className={sroks.includes("2024") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("2024", sroks, setSroks, false) }} href="#">2024</a></li>
                            <li><a className={sroks.includes("2025") ? "act" : ""} onClick={(e) => { e.preventDefault(); updateList("2025", sroks, setSroks, false) }} href="#">2025</a></li>
                        </ul>
                    </li>
                </ul>

                <a className="ws_get   btn_anim" onClick={(e) => { e.preventDefault(); nextStep() }} href="#">
                    <div className="ws_ico">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAADAFBMVEVHcExOxV1VvGBXtmVYuGFTumNQwltUvltTuWBYtmNXu2JRt2VUumNdsWdbsWdQvGlUuGNhq2hLvVVStWJVu2Fcul1ZuWRWumFVtF5erWpWuWREyExZt2RUvmRctGhUu19UumBVvF9cs2ZXuGRVvV9XumJSu2hZvGNHx09XuV9Xt2RXuGNbsGpWvGNWumNNwlhQx19UvWJWu2JQwFtTuWZQv1tTvl5Wu2NYuWNWu2JVt2Bbt2dVvF5WumJWumRZuGVXvGNYu2NWvGFWvGJbsmVYuGVXu2NWumJYuWRavWROx1xXuGRXumNXuWRWvGJYuWRWumNXu2NXuWBXu2NZvWNTv15Xu2JXu2JXu2NWu2NWu2JYuWRXu2NXvGBXu2NXu2P///9Yu2RVumFXvGNZvGU7sElWvGI5r0c/sUxAsk5FtFNHtFRYvGRavGY2rkVMt1lNt1pOuFtRuV1UumBWu2JWu2M3rkY5r0g9sUtDs1BDs1FItVVbvWdnwnM0rUI1rUQ8sEpJtVZKtldLtlhPuFxTuV9XumNXu2JWvGNiv21pwnSO0ZZCslBYumRYu2NfvmqHzo/+//8uqj0xq0AyrEBBsk5QuF1WumFYu2JXvGJXvWRevmllwXB0x352x3+Iz5GW1Z6q3LCz4Lm85MHJ6c3U7tfp9uvt+O7z+vP2+/f+/v4pqTkxrEA2rkREs1JHtVRYuWRbuGhauWZXu2RVvmFbvWZuxHh9yod+y4iCzYuL0JOQ0pim26yn262r3bGv3rS04bq24bu547+75MDC5sbE58jG6MvM6tDO69Le8uDo9enw+fH0+vX3/Pj7/fv8/v0sqjswqz81rkQ8sElVumRat2dYuWVYumVaumBZu2RVv19Vv2JavGVavWZvxHlyxXx3yIB4yIJ7yoR8yoWAy4mFzY6P0ped16Se16Wh2Keh2aek2qqs3bKx37a+5MO/5cPA5cTE58nQ7NPS7dXW7tnZ79vb8N3h8+Pi8+Tl9Ofm9ejq9+zv+fDx+fH5/fr7/fyxVpZeAAAAX3RSTlMAAQIEBwgLExkeIygqLjM2Ojo6PkBDRUlPU1VWWFpaW2FhZmprbW5vb3B2enp8g4OLjY6PkZWVlpafoqOlqKyttbe5vLy8vsTEyMvNzdLT1dnd4eHk5OXn6uvz9/j4/P50lGsAAAPfSURBVEjHfZV1nFtFEMcX2lLBrUChUFwOChQ5itWgaAuHHAVKd/a9vLgnF08uySUXO9eeu9bd3R13d3f3T/J2c016l/lr3+535/12dmYWoTQbdvK4rOzJ2dddcMpwlNnOmvTwvDws2uzsczKQl87CKzBPUR5jPueaEYOTE3J4xjHjw09dOQg5cioe1ArvG5OOnjoHD2Vz02SfjTPZ+BSvr2dk6889SutzK1LWzByX8h0Kn5hkH5qfnC6R6G1WuUMhCD5CBg74BEOvrk9OanSLcNmWzq49WzdEZEpNkp5/s4iOmMfCStRW/eeHgNo3rhdNEsaGRyXYiVKGmj1NfwHsal3b/OGn28sBYvkGBi+9M5EszzIWe9YD7CiVaeV2hUUb/Arg63yjWlwqXjkSITQ+xLRq1wCsr6wuIQk5zorVh2Gjh0oO1V2LEJpG84oouX5oqagRbBIiiq9sLIdmK1VROBuh4XOZWs8PsPV5g+6zDU7qS1MRg26FkSkchU6XUr/21dCn83nbABqUdDWo/QViMrpz2fnoEnay/C2weaFB0w+wTTCLU5L8T+BnG73DV65HNxaKQ5PjV3hf7nQDwG8KE91f8HY5uHTiWHoHuptOG2r/hQZ/0LEPDrpVTKJJ9Tu856Af09B05qIUDnMGtbUM+iIWFyYmjmDMFf0IH1VTYiZi5VDQAEewHnPaPdBd4FllVFUvVhPO3gUfFFFiBppMRzWBv6FRhSUqVTfsdy+Q7/0+opQYdQcgShVJp6AsGodabye0aNXYJTf9CdD2LQDEbEVR6DXUiMBrt6LzVtKrsLTC3kUYY5dc3yEm2heyFzbBdi398bKr0OgQvQu9sQfWxLW5VN6m9h7ob9cpAocg6qB3UXwGQjksdSpj8JMQD7zELJfh5qhCWbUbOqreoOvPDENoEmaX9CVssvqd8dIhRG/3Kxduhn98Puo2bwpC6CTKBgy9RxYviLgt9qAZY9OSqoIdUB7xvkOXw2MTlZmIBJG1QFfTdwBtbqdN8CpLW/ugp1GmoeirTyZq6EwxUyw742c/8B/AH50du/YBQHtAYCjOu1Aszgfi6eMrBTi482M/t3F/ImC929wW5yqGhh+jNT+mFmPsWLe7jAgvGf0yfXRt2bp3g1Y7USe7xsunsQZxRT3GRKIQdDgeA+MShU2uDOCBVrL0zRsGmtTtPCYcVzJUP3vrnqOb39RMrY9/MLWp3pWBnXlcWrOeOCR627GPwNhHQ8dyhM8dN+jjcvnjfF0qmvd01lCv3PET7pWS5cXxtllXvJyY77/shEyP4eiLbpo+K3dO7iMzbrk4/QH6H9tLb1NB4pNBAAAAAElFTkSuQmCC" />
                    </div>
                    <div className="ws_text">Получить на<br /><span>WhatsApp</span></div>
                    <div className="ws_str"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAS1BMVEVHcExXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2PcvgX6AAAAGHRSTlMA6kxma2Vj/mlnmJtsCfGTkuRo52T3+W1KEZ4wAAAAaElEQVR42p3SSQqAMAwF0Ni5zrO5/0nFgBYsidS/K2+TJh9e6ZqtBS41ojcc9ijo6i8NjGrSmdFIGhkNpPaXGlIHoBbkMkKFbLyMamJxkAYq+kpakS5enxXO4h77PnZek+N+5AXbU8FOXLwQeRneVHsAAAAASUVORK5CYII=" /></div>
                </a>
            </div>
        </div>
    </React.Fragment>
}

export default MainScreen