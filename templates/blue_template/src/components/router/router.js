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

    useEffect(()=> {
        let toAdd = []
        domainSettings.domain.Steps.forEach((step) => {
            if (step.type == "raions" || step.type == "text" || step.type == "rooms") {
                if (step.type == "raions") {
                    setRaionsName(step.title)
                }
                if (step.type == "rooms") {
                    setRoomsName(step.title)
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
        setParams(domainSettings.domain)
    }, [])
    
    // return <div className="container_main" style={{background: `url("https://cdn.statically.io/img/i.pinimg.com/originals/52/96/7e/52967e9aee1c617cb0668d3ef1704eba.jpg") repeat-y center top`}}> 
    return <div className="container_main"> 
    {/* /file-store/${params.background} */}
            {step==null?<MainScreen params={params} nextStep={nextStep} />:params.Steps.length<=step?<FinishSteps form={form} form={form} setForm={setForm} params={params} />:<Step step={params.Steps[step]} raionsStep={raionsName} roomsStep={roomsName} params={params} index={step} length={params.Steps.length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
        </div>
}

export default Router