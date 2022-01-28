import { useEffect, useState } from "react"
import { domainSettingsForTest } from "../../utils"
import MainScreen from "../main-screen"
import Cookies from 'js-cookie'
import NameScreeen from "../name-screen"

const Router = () => {
    const [step, setStep] = useState(0)
    const [params, setParams] = useState({})

    const [form, setForm] = useState({})
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
    const prevStep = (event) => {
        try {
            event.preventDefault()
        } catch (e) { }
        setStep(step - 1)
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

    useEffect(() => {
        try {
            Cookies.set('city_id', domainSettings.city.portal_id)
        } catch (e) { }
        let toAdd = []
        let formNew = {}
        toAdd.forEach((add) => {
            formNew = {
                ...formNew,
                [add.title]: ""
            }
        })
        setForm(formNew)
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
    }, [])

    return <div className="container_main ">
        {step == 0 ? <MainScreen params={params} form={form} nextStep={nextStep} /> : <NameScreeen params={params} form={form} />}
    </div>
}

export default Router