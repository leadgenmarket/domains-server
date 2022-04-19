import { useEffect, useState } from "react"
import { SendFilter, SetUniqID } from "../../utils/send-data"
import MainScreen from "../main-screen"
import PhoneScreen from "../phone-screen"

const Router = () => {
    const [step, setStep] = useState(0)
    const [params, setParams] = useState({})
    const [rooms, setRooms] = useState(["1"])
    const [sroks, setSroks] = useState([])
    const [phone, setPhone] = useState("")
    const [number, setNumber] = useState()
    const [price, setPrice] = useState()
    const nextStep = (event) => {
        try {
            event.preventDefault()
        } catch (e) { }
        if (step == null) {
            setStep(0)
        } else {
            setStep(step + 1)
        }
    }

    const generateNumber = () => {
        var now = new Date();
        let number = now.getMonth() + '' + now.getDate() + '' + now.getHours() + '' + now.getMinutes() + '' + now.getSeconds() + '' + now.getMilliseconds()
        setNumber(number)
        return number
    }

    useEffect(() => {
        let number = generateNumber()
        SendFilter(sroks, rooms, number)
        SetUniqID()
        domainSettings.domain.title = domainSettings.title
        setParams(domainSettings.domain)

        if (domainSettings.domain.yandex !== "") {
            try {
                ym(parseInt(domainSettings.domain.yandex), 'getClientID', function (clientID) {
                    domainSettings.domain.clientID = clientID
                })
            } catch (e) { }
        }

        if (domainSettings.title.indexOf("|") != -1) {
            setPrice(parseFloat(domainSettings.title.split("|")[1]))
            return
        }
        let prices = domainSettings.prices.prices[0]
        setPrice(Math.round(prices["min"] * 10) / 10)
    }, [])

    return <div className="container_main " style={{ background: params.background != "" ? `url("/file-store/${params.background}") center / cover no-repeat` : `` }}>
        {step === 0 ? <MainScreen params={params} price={price} setPrice={setPrice} rooms={rooms} setRooms={setRooms} sroks={sroks} setSroks={setSroks} nextStep={nextStep} generateNumber={generateNumber} number={number} /> : <PhoneScreen params={params} phone={phone} sroks={sroks} rooms={rooms} setPhone={setPhone} number={number} />}
        {domainSettings.organization.name.length > 0 ? <footer>
            <div class="wmain">
                <div class="fl">{domainSettings.organization.name}, <br />{domainSettings.organization.adress}</div>
                <div class="fr"><a href={`tel:${domainSettings.organization.phone.replace('-', '')}`}>{domainSettings.organization.phone}</a></div>
            </div>
        </footer> : ""}
    </div>
}

export default Router