import { useState } from 'react'
import InputMask from 'react-input-mask'
import { SendData } from "../../utils"

export const PhoneScreen = ({ phone, rooms, sroks, setPhone, number, params }) => {
    const [error, setError] = useState(false)

    const inputChange = (event) => {
        let value = event.target.value

        if (value.length > 4 && value.slice(0, 5) != "+7 (9") {
            value = "+7 ("
        }
        setPhone(value)
    }

    const continueClick = (event) => {
        if (phone.length === 18) {
            setError(false)
            SendData(phone, sroks, rooms, "getForm")
        } else {
            event.preventDefault()
            setError(true)
        }
        setTimeout(() => {
            console.log(error)
        }, 200)

    }

    let secondaryColor = params.secondary_color == "27353E" ? "#1d3887" : "#" + params.secondary_color

    return (<div className="page_two">
        <div className="content_title ct_two">
            Подборка квартир по вашему запросу будет отправлена вам на WhatsApp
        </div>
        <div className="get">
            Получите самые выгодные <br />предложения уже <span>через 7 секунд</span>
        </div>
        <form className="form_main">
            <div className="fl_title">Номер телефона</div>
            <InputMask mask="+7\ (999) 999-99-99" name="phone" value={phone} onChange={inputChange} maskChar={null} >
                {(inputProps) => <input id="q_phone" style={{ background: secondaryColor }} className={error ? "in_phone ym-record-keys err" : "in_phone ym-record-keys"}  {...inputProps} placeholder="+7 ( ___ ) ___ - __ - __" />}
            </InputMask>
        </form>
        <div className="btn_text">
            После нажатия на кнопку вы будете <br /> перенаправлены в WhatsApp.
        </div>
        <a className="ws_get whatsapp_ch btn_anim hrefUniqId" onClick={continueClick} href={`https://api.whatsapp.com/send?phone=79000000150&text=Варианты квартир подобраны (№ ${number}). Просто отправьте это сообщение ➡️`} target="blanc_">
            <div className="ws_ico">
                <img src="data:image/png;base64,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" />
            </div>
            <div className="ws_text">Получить на<br /><span>WhatsApp</span></div>
            <div className="ws_str"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAS1BMVEVHcExXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2NXu2PcvgX6AAAAGHRSTlMA6kxma2Vj/mlnmJtsCfGTkuRo52T3+W1KEZ4wAAAAaElEQVR42p3SSQqAMAwF0Ni5zrO5/0nFgBYsidS/K2+TJh9e6ZqtBS41ojcc9ijo6i8NjGrSmdFIGhkNpPaXGlIHoBbkMkKFbLyMamJxkAYq+kpakS5enxXO4h77PnZek+N+5AXbU8FOXLwQeRneVHsAAAAASUVORK5CYII=" /></div>
        </a>
    </div>
    )
}