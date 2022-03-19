import { useState } from "react"
import "./buttons.css"
const ChooseOptions = ({json, name, options, addClick}) => {
    const [value, setValue] = useState("")
    const generateButtons = options.map((option) => {
        console.log(option)
        if (option.image!=undefined) {
            return <div type="optionImage" onClick={()=>{setValue(option.id)}} className={option.id==value?"option-image act":"option-image"}><img src={option.image}/></div>
        } else {
            return <button type="button" onClick={()=>{setValue(option.id)}} className={option.id==value?"btn btn-primary round waves-effect btn-sm":"btn btn-outline-primary round waves-effect btn-sm"}>{option.name}</button>
        }
    })
    return <div className="form-group">
                <div className="choose-header">
                    <label for={json}>{name}</label>
                    <button type="button" onClick={addClick} className="btn btn-primary waves-effect btn-sm">Добавить</button>
                </div>
                <input type="hidden" name={json} value={value}/>
                <div className="buttons-list">
                    {generateButtons}
                </div>
                <div className="invalid-feedback">Выберите один из вариантов.</div>
            </div>
}

export default ChooseOptions