import React from "react"
import TextModal from './text-modal'

import "./modals.css"
import SuccessModal from "./success-modal"
const Modals = ({forms, request, loading, error, sendRequest}) => {
    const generateHtml = forms.map((form)=> {
        return (<TextModal  form={form} sendRequest={sendRequest}/>)
    })

    return (
        <div class="modal fade show" id="inlineForm" tabindex="-1" aria-labelledby="myModalLabel33" style={{display: "none"}} aria-hidden="true">
            {generateHtml}  
            <SuccessModal />                   
        </div> 
    )
}

export default Modals