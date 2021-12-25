import axios from "axios"
import React, { useEffect, useState } from "react"

const StepsComponent = ({quizSteps, setQuizSteps, city_id}) => {
    const [raions, setRaions] = useState([])
    const inputChange = (event) => {
    }
    const answerChange = (event) => {
        let value = event.target.value
        setQuizSteps((prevState) => {
            let stepindex = parseInt(event.target.getAttribute('indexstep'))
            let answerindex = parseInt(event.target.getAttribute('indexanswer'))
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepindex].answers[answerindex] = value
            if (answerindex == newQuizSteps[stepindex].answers.length-1 && value!="") {
                newQuizSteps[stepindex].answers[answerindex+1]=""
            }
            return newQuizSteps
        })
    }

    const questionChange = (event) => {
        let value = event.target.value
        let stepindex = parseInt(event.target.getAttribute('indexstep'))
              
        setQuizSteps((prevState)=> {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepindex].title = value
            return newQuizSteps
        })
    }

    const stepDelete = (stepID, answerID) => {
        setQuizSteps((prevState) => {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepID].answers.splice(answerID, 1)
            return newQuizSteps
        })
    }

    const addStep = () => {
        setQuizSteps((prevState) => {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps.push({
                title: "",
                type: "text",
                answers: [
                    ""
                ]})
            
            return newQuizSteps
        })
    }

    const changeQuestionType = (event) => {
        let stepindex = parseInt(event.target.getAttribute('stepindex'))
        console.log(stepindex)
        setQuizSteps((prevState) => {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepindex].type = event.target.value
            if (newQuizSteps[stepindex].type == "text") {
                newQuizSteps[stepindex].answers = [""]
            }
            return newQuizSteps
        })
    }

    const sliderParamChange = (event) => {
        let index = parseInt(event.target.getAttribute('indexstep'))
        if (event.target.value[event.target.value.length-1] %1 === 0 || event.target.value[event.target.value.length-1] === ",") {
           
        setQuizSteps((prevState) => {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[index] = {
                ...newQuizSteps[index],
                [event.target.name]:event.target.value,
            }
            return newQuizSteps
        })}
    }

    const getCityRaions = () => {
        axios.get("/api/locations/raions/"+city_id).then((resp) => {
            setRaions(resp.data.payload)
        })
    }

    useEffect(()=>{
        getCityRaions()
    },[city_id])

    return (<React.Fragment >
        <div className="text-center mb-4">
            <h5>Шаги</h5>
            <p className="card-title-desc">Заполните шаги (если ни один шаг не будет добавлен, то будут использованны, стандратные)</p>
        </div>
        
            {
                quizSteps.map((step, i) => {
                    return <React.Fragment key={i}><div>
                                <div className="row">
                                    <div className="mb-3">
                                        Шаг {i+1} / {quizSteps.length}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="basicpill-servicetax-input" className="form-label">Текст вопроса</label>
                                            <input type="text" indexstep={i} onChange={questionChange} className="form-control" name="mail" id="basicpill-servicetax-input" value={step.title} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="basicpill-servicetax-input" className="form-label">Тип шага</label>
                                            <select onChange={changeQuestionType} stepindex={i} className="form-select custom-select" id="template" name="template_id" name="qoopler" value={step.type} >
                                                <option value="text">Текстовый</option>
                                                <option value="slider">Слайдер</option>
                                                <option value="raions">Районы</option>
                                                <option value="slider_r">Слайдер (цены из района)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                {step.type == "text" ?<React.Fragment>
                                        <div className="mb-3" style={{marginLeft:"15px"}}>
                                            <span>Ответы на вопрос</span>
                                        </div>
                                        {step.answers.map((answer, index) => {
                                        return <div key={i} className="column">
                                                <div className="col-lg-6 ml-2">
                                                    <div className="mb-3" style={{display:"flex", marginLeft:"30px", alignItems:"center"}}>
                                                        {index+1}.  <input style={{marginLeft:"10px", marginRight:"10px"}} type="text" autoComplete="off" onChange={answerChange} indexanswer={index} indexstep={i} className="form-control" name="mail" id="basicpill-servicetax-input" value={answer}  /> {step.answers.length>1?<i onClick={() => {stepDelete(i, index)}} className="feather-trash" style={{color:"red"}} />:""}
                                                    </div>
                                                </div>
                                            </div>})
                                        }
                                        </React.Fragment>
                                    
                                    :step.type == "raions"?<React.Fragment>
                                         <div className="mb-3" >
                                            <span>Районы города</span>
                                        </div>
                                        <div className="row">
                                            {
                                                raions.map((raion) => {
                                                    return raion.Name+", "
                                                })
                                            }
                                        </div>
                                    </React.Fragment>:step.type == "slider_r"?<React.Fragment>
                                         <div className="mb-3" >
                                            <span>Слайдер подтянет цены по районам, параметры задавать не нужно, только тайтл шага</span>
                                        </div>
                                    </React.Fragment>:<React.Fragment>
                                        <div className="mb-3" >
                                            <span>Параметры слайдера</span>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label htmlFor="basicpill-servicetax-input" className="form-label">От</label>
                                                    <input type="text" indexstep={i} onChange={sliderParamChange} name="from" value={step.from} className="form-control" id="basicpill-servicetax-input" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label htmlFor="basicpill-servicetax-input" className="form-label">До</label>
                                                    <input type="text" indexstep={i} onChange={sliderParamChange} name="to" value={step.to} className="form-control" id="basicpill-servicetax-input" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3">
                                                <label htmlFor="basicpill-servicetax-input" className="form-label">Шаг</label>
                                                <input type="text" indexstep={i} onChange={sliderParamChange} name="step" value={step.step} className="form-control" id="basicpill-servicetax-input" />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                                
                            </div>
                            <hr className="my-4"></hr>
                        </React.Fragment>
                })
            }
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={addStep}><i className="feather-plus"></i> Добавить шаг </button>
        </div>
    </React.Fragment>)
}

export default StepsComponent