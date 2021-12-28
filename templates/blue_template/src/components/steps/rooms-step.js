import { useEffect, useState } from "react"
import CheckBoxItem from "./checkbox-item"

const RoomsStep = ({ step, params, raionsStep, index, length, nextStep, prevStep, form, setForm }) => {
    const [rooms, setRooms] = useState(["Студии", "1 - комнатные квартиры", "2 - комнатные квартиры", "3 - комнатные квартиры", "4 - комнатные квартиры"])

    const amIChecked = (answer) => {
        return form[step.title].split(", ").includes(answer)
     }
 
     const updateCheck = (answer) => {
         if (amIChecked(answer)) {
             unsetAnswer(answer)
         } else {
             setAnswer(answer)
         }
     }
 
     const setAnswer = (answerIn) => {
         let answers = form[step.title].split(", ")
         if (answers[0] == "") {
             answers.splice(0,1)
         }
         answers.push(answerIn)
         let newForm = {}
         for (let i in form) {
             newForm[i] = form[i]
         }
         newForm[step.title] = answers.join(", ")
         setForm(newForm)
     }
         
     const unsetAnswer = (answerOut) => {
         let answers = form[step.title].split(", ")
         if (answers[0] == "") {
             answers.splice(0,1)
         }
         for (var key in answers) {
             if (answers[key] === answerOut) {
                 answers.splice(key, 1);
             }
         }
         let newForm = {}
         for (let i in form) {
             newForm[i] = form[i]
         }
         if (answers.length !== 0) {
             newForm[step.title] = answers.join(", ")
         } else {
             newForm[step.title] = ""
         }
         setForm(newForm)
     }
 
     const updateCheckAll = () => {
         if (!amIChecked("Все")) {
             setAllRaions()
         } else {
             unsetAllRaions()
         }
     } 
 
     const setAllRaions = () => {
         let newForm = {}
         for (let i in form) {
             newForm[i] = form[i]
         }
         newForm[step.title] = "Все, "+domainSettings.locations.map((location) => location.NameFull).join(", ")
         setForm(newForm)
     }
 
     const unsetAllRaions = () => {
         let newForm = {}
         for (let i in form) {
             newForm[i] = form[i]
         }
         newForm[step.title] = ""
         setForm(newForm)
    }

    useEffect(()=>{
        if (form[raionsStep]!= "") {
            let raions = form[raionsStep].split(", ")
            let roomTypes=[]
            console.log(raions)
            domainSettings.locations.map((location) => {
                if (raions.includes(location.NameFull)){
                    try{
                        let prices =domainSettings.prices.prices[location.PortalID]
                        if (prices["max_0"]>0 && !roomTypes.includes("Студии")) {
                            roomTypes.push("Студии")
                        }
                        if (prices["max_1"]>0 && !roomTypes.includes("1 - комнатные квартиры")) {
                            roomTypes.push("1 - комнатные квартиры")
                        }
                        if (prices["max_2"]>0 && !roomTypes.includes("2 - комнатные квартиры")) {
                            roomTypes.push("2 - комнатные квартиры")
                        }
                        if (prices["max_3"]>0 && !roomTypes.includes("3 - комнатные квартиры")) {
                            roomTypes.push("3 - комнатные квартиры")
                        }
                        if (prices["max_4"]>0 && !roomTypes.includes("4 - комнатные квартиры")) {
                            roomTypes.push("4 - комнатные квартиры")
                        }
                    } catch(e){}
                }
            })
            setRooms(roomTypes)
        }
    }, [index])

    return <ul className="check_list_one check_list" id="kv_list">
        {rooms.map((answer) => {
            return <CheckBoxItem checked={amIChecked(answer)} updateCheck={updateCheck} key={answer} answer={answer} step ={step} params={params} index={index} length={length} nextStep={nextStep} prevStep={prevStep} form={form} setForm = {setForm} />
        })}
    </ul>
}

export default RoomsStep