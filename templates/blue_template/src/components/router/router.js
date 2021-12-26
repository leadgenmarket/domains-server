import { useEffect, useState } from "react"
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
        console.log(domainSettings)
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
        setParams(domainSettings.domain)
    }, [])
    return <div className="container_main" style={{background: `url("http://localhost:8080/file-store/${params.background}") repeat-y center top`}}> {/* http://localhost:8080/file-store/${params.background} */}
            {step==null?<MainScreen params={params} nextStep={nextStep} />:params.Steps.length<=step?<FinishSteps form={form} form={form} setForm={setForm} params={params} />:<Step step={params.Steps[step]} raionsStep={raionsName} roomsStep={roomsName} params={params} index={step} length={params.Steps.length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
        </div>
}

export default Router