import { useEffect, useState } from "react"
import { domainSettingsForTest } from "../../utils"
import FinishSteps from "../finish-steps"
import MainScreen from "../main-screen"
import Step from "../steps"

const Router = () => {
    const [step, setStep] = useState(null)
    const [params, setParams] = useState({})
    const [raionsName, setRaionsName] = useState("")
    const [roomsName, setRoomsName] = useState("")
    const [sdachaName, setSdachaName] = useState("")

    const [form,setForm] = useState({})
    const nextStep = (event) => {
        try{
            event.preventDefault()
        } catch(e){}
        if (step == null) {
            setStep(0)
        } else {
            setStep(step+1)
        }
    }
    const prevStep = (event) => {
        try{
            event.preventDefault()
        } catch(e){}
        setStep(step-1)
    }

    const getAvailableRaions = () => {
        let resultRaions = []
        domainSettings.locations.map((location) => {
            if (domainSettings.prices.prices[location.PortalID] === undefined){
                return false
            }
            let flag=false
            let prices = domainSettings.prices.prices[location.PortalID]
            for(let i =0; i<5; i++) {
                if (parseFloat(prices["min_"+i])>0 && parseFloat(prices["max_"+i])>0 && parseFloat(prices["min_"+i])<parseFloat(prices["max_"+i])) {
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

    useEffect(()=> {
        let toAdd = []
        domainSettings.domain.Steps.forEach((step) => {
            if (step.type == "raions" || step.type == "text" || step.type == "rooms" || step.type == "sdacha") {
                if (step.type == "raions") {
                    setRaionsName(step.title)
                }
                if (step.type == "rooms") {
                    setRoomsName(step.title)
                }
                if (step.type == "sdacha") {
                    setSdachaName(step.title)
                }
                toAdd.push(step)
            }
        })
        let formNew = {}
        toAdd.forEach((add) => {
            formNew = {
                ...formNew,
                [add.title]:""
            }
        })
        setForm(formNew)
        domainSettings.domain.title = domainSettings.title
        getAvailableRaions()
        setParams(domainSettings.domain)
    }, [])
    
    return <div className="container_main" style={{background: params.background!=""?`url("/file-store/${params.background}") center / cover no-repeat`:``}}> 
            {step==null?<MainScreen params={params} nextStep={nextStep} />:params.Steps.length<=step?<FinishSteps form={form} form={form} setForm={setForm} params={params} />:<Step step={params.Steps[step]} raionsStep={raionsName} roomsStep={roomsName} params={params} index={step} length={params.Steps.length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
        </div>
}

export default Router