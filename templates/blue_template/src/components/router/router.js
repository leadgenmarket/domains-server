import { useState } from "react"
import FinishSteps from "../finish-steps"
import MainScreen from "../main-screen"
import Step from "../steps"

const Router = () => {
    const [step, setStep] = useState(null)
    const [params, setParams] = useState({
        id: "61c3451229fdc73c118849c4",
        url: "novostroi-peterbyrga.ru",
        template_id: "61c2261029fdc7281d3042db",
        CreatedBy: "61c0a26329fdc715c9d1e631",
        city_id: "61c249a129fdc7316597f3cf",
        background: "fcba8eca-7113-4973-53dc-097ddb7adcbb.jpg",
        main_color: "3c6397",
        secondary_color: "032045",
        yandex: "86898916",
        google: "",
        mail: "",
        roistat: "",
        marquiz: "",
        Steps: [
            {
                answers: [
                    "Ответ - 1",
                    "Ответ - 2",
                    "Ответ - 3",
                    "Ответ - 4"
                ],
                title: " Тестовый шаг - 1",
                type: "text"
            },
            {
                answers: [
                    "Через месяц",
                    "В течении двух месяцев",
                    "В течении года"
                ],
                title: "Когда планируете купить?",
                type: "text"
            },
            {
                answers: [
                    ""
                ],
                from: "1500000",
                step: "10000",
                title: "На какой бюджет вы расчитываете?",
                to: "5000000",
                type: "slider"
            }
        ],
        organization_id: "61c2261029fdc7281d3042e3",
        Qoopler: false,
        CreatedAt: "2021-12-22T15:32:34.54Z",
        UpdatedAt: "2021-12-22T15:32:34.54Z"
    })

    const [form,setForm] = useState({})
    const nextStep = (event) => {
        event.preventDefault()
        if (step == null) {
            setStep(1)
        } else {
            setStep(step+1)
        }
    }
    const prevStep = (event) => {
        event.preventDefault()
        setStep(step-1)
    }
    return <div className="container_main" style={{backgroundImage: `url("2901788.jpg")`}}> {/* http://localhost:8080/file-store/${params.background} */}
            {step==null?<MainScreen params={params} nextStep={nextStep} />:params.Steps.length<=step?<FinishSteps form={form} setForm={setForm} params={params} />:<Step step={params.Steps[step]} params={params} index={step} length={params.Steps.length} nextStep={nextStep} prevStep={prevStep} form={form} setForm={setForm} />}
        </div>
}

export default Router