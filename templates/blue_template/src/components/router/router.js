import { useEffect, useState } from "react"
import { domainSettingsForTest } from "../../utils"
import FinishSteps from "../finish-steps"
import MainScreen from "../main-screen"
import Step from "../steps"
import Cookies from 'js-cookie'

const Router = () => {
    const [step, setStep] = useState(null)
    const [params, setParams] = useState({})
    const [raionsName, setRaionsName] = useState("")
    const [roomsName, setRoomsName] = useState("")
    const [sdachaName, setSdachaName] = useState("")
    const [raionsPrice, setRaionsPrice] = useState("")

    const [ignoreFirstStep, setIgnore] = useState(false)

    const [form, setForm] = useState({})
    const nextStep = (event) => {
        try {
            event.preventDefault()
        } catch (e) { }
        if (step == null) {
            if (ignoreFirstStep) {
                setStep(1)
            } else {
                setStep(0)
            }
        } else {
            setStep(step + 1)
        }
    }
    const prevStep = (event) => {
        try {
            event.preventDefault()
        } catch (e) { }
        if (step - 1 && ignoreFirstStep) {
            setStep(0)
        } else {
            setStep(step - 1)
        }
    }

    const getAvailableRaions = () => {
        let resultRaions = []
        domainSettings.locations.map((location) => {
            if (domainSettings.prices.prices[location.PortalID] === undefined) {
                return false
            }
            let flag = false
            let prices = domainSettings.prices.prices[location.PortalID]
            for (let i = 0; i < 5; i++) {
                if (parseFloat(prices["min_" + i]) > 0 && parseFloat(prices["max_" + i]) > 0 && parseFloat(prices["min_" + i]) < parseFloat(prices["max_" + i])) {
                    flag = true
                    break
                }
            }

            if (flag) {
                resultRaions.push(location)
            }
        })
        domainSettings.locations = resultRaions
    }

    useEffect(async () => {
        try {
            Cookies.set('city_id', domainSettings.city.portal_id)
        } catch (e) { }
        let toAdd = []
        let raionStep = ""
        domainSettings.domain.Steps.forEach((step) => {
            if (step.type == "raions" || step.type == "text" || step.type == "rooms" || step.type == "sdacha") {
                if (step.type == "raions") {
                    raionStep = step.title
                    setRaionsName(step.title)
                    if (domainSettings.rayon !== "") {
                        setIgnore(true)
                        return
                    }

                }
                if (step.type == "rooms") {
                    setRoomsName(step.title)
                }
                if (step.type == "sdacha") {
                    setSdachaName(step.title)
                }

                toAdd.push(step)

            }
            if (step.type == "slider_r") {
                setRaionsPrice(step.title)
            }
        })





        domainSettings.domain.title = domainSettings.title
        getAvailableRaions()
        setParams(domainSettings.domain)
        if (domainSettings.domain.yandex != "") {
            try {
                ym(parseInt(domainSettings.domain.yandex), 'getClientID', function (clientID) {
                    domainSettings.domain.clientID = clientID
                })
            } catch (e) { }
        }

        let formNew = {}
        if (domainSettings.rayon !== "" && raionStep != "") {
            formNew = {
                [raionStep]: getRaionsNameFull(domainSettings.rayon)
            }
        }
        toAdd.forEach((add) => {
            formNew = {
                ...formNew,
                [add.title]: ""
            }
        })

        setForm(formNew)
    }, [])

    const getRaionsNameFull = (raion) => {
        let name = ""
        domainSettings.locations.forEach((location) => {
            if (location.Path == raion) {
                name = location.NameFull
            }
        })
        return name
    }

    return <div className="container_main" style={{ background: params.background != "" ? `url("/file-store/${params.background}") center / cover no-repeat` : `` }}>
        {step == null ? <MainScreen params={params} nextStep={nextStep} /> : params.Steps.length <= step ? <FinishSteps form={form} setForm={setForm} raionsStep={raionsName} raionsPrice={raionsPrice} roomsStep={roomsName} sdachaName={sdachaName} params={params} /> : <Step step={params.Steps[step]} ignoreFirst={ignoreFirstStep} raionsStep={raionsName} raionsPrice={raionsPrice} roomsStep={roomsName} params={params} index={step} length={params.Steps.length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
    </div>
}

export default Router