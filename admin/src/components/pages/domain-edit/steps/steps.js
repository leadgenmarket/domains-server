import React, { useEffect, useState } from "react"

const StepsComponent = ({quizSteps, setQuizSteps}) => {
    
    const inputChange = (event) => {
    }
    const answerChange = (event) => {
        let value = event.target.value
        setQuizSteps((prevState) => {
            let stepIndex = parseInt(event.target.getAttribute('indexStep'))
            let answerIndex = parseInt(event.target.getAttribute('indexAnswer'))
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepIndex].answers[answerIndex] = value
            if (answerIndex == newQuizSteps[stepIndex].answers.length-1 && value!="") {
                newQuizSteps[stepIndex].answers[answerIndex+1]=""
            }
            return newQuizSteps
        })
    }

    const questionChange = (event) => {
        let value = event.target.value
        let stepIndex = parseInt(event.target.getAttribute('indexStep'))
              
        setQuizSteps((prevState)=> {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepIndex].title = value
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
        let stepIndex = parseInt(event.target.getAttribute('stepIndex'))
        console.log(stepIndex)
        setQuizSteps((prevState) => {
            let newQuizSteps = Array.from(prevState)
            newQuizSteps[stepIndex].type = event.target.value
            if (newQuizSteps[stepIndex].type == "text") {
                newQuizSteps[stepIndex].answers = [""]
            }
            return newQuizSteps
        })
    }

    const sliderParamChange = (event) => {
        let index = parseInt(event.target.getAttribute('indexStep'))
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

    return (<React.Fragment>
        <div class="text-center mb-4">
            <h5>Шаги</h5>
            <p class="card-title-desc">Заполните шаги (если ни один шаг не будет добавлен, то будут использованны, стандратные)</p>
        </div>
        
            {
                quizSteps.map((step, i) => {
                    return <React.Fragment><div>
                                <div class="row">
                                    <div class="mb-3">
                                        Шаг {i+1} / {quizSteps.length}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="mb-3">
                                            <label for="basicpill-servicetax-input" class="form-label">Текст вопроса</label>
                                            <input type="text" indexStep={i} onChange={questionChange} class="form-control" name="mail" id="basicpill-servicetax-input" value={step.title} />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="mb-3">
                                            <label for="basicpill-servicetax-input" class="form-label">Тип шага</label>
                                            <select onChange={changeQuestionType} stepIndex={i} className="form-select custom-select" id="template" name="template_id" name="qoopler" value={step.type} >
                                                <option value="text">Текстовый</option>
                                                <option value="slider">Слайдер</option>
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
                                                        {index+1}.  <input style={{marginLeft:"10px", marginRight:"10px"}} type="text" autocomplete="off" onChange={answerChange} indexAnswer={index} indexStep={i} class="form-control" name="mail" id="basicpill-servicetax-input" value={answer}  /> {step.answers.length>1?<i onClick={() => {stepDelete(i, index)}} className="feather-trash" style={{color:"red"}} />:""}
                                                    </div>
                                                </div>
                                            </div>})
                                        }
                                        </React.Fragment>
                                    
                                    :<React.Fragment>
                                        <div className="mb-3" >
                                            <span>Параметры слайдера</span>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="mb-3">
                                                    <label for="basicpill-servicetax-input" class="form-label">От</label>
                                                    <input type="text" indexStep={i} onChange={sliderParamChange} name="from" value={step.from} class="form-control" id="basicpill-servicetax-input" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="mb-3">
                                                    <label for="basicpill-servicetax-input" class="form-label">До</label>
                                                    <input type="text" indexStep={i} onChange={sliderParamChange} name="to" value={step.to} class="form-control" id="basicpill-servicetax-input" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="mb-3">
                                                <label for="basicpill-servicetax-input" class="form-label">Шаг</label>
                                                <input type="text" indexStep={i} onChange={sliderParamChange} name="step" value={step.step} class="form-control" id="basicpill-servicetax-input" />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                                
                            </div>
                            <hr class="my-4"></hr>
                        </React.Fragment>
                })
            }
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary" onClick={addStep}><i class="feather-plus"></i> Добавить шаг </button>
        </div>
    </React.Fragment>)
}

export default StepsComponent