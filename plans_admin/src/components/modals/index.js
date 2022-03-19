import { createElement } from "react"
import Modals from "./modals"

const showModal = (modal) => {
    document.querySelector('#inlineForm').style.display = "block"
    document.querySelector('body').classList.add('modal-open')
    document.querySelectorAll('.modal-dialog').forEach((modal) => {
        modal.style.display = "none"
    })
    //document.querySelector('.modal-backdrop').classList.add('show')
    if (!document.querySelector('.modal-backdrop')){
        var backdrop = document.createElement("div");
        backdrop.classList.add('modal-backdrop')
        backdrop.classList.add('fade')
        //document.querySelector('.app-content').append(backdrop)
        backdrop.classList.add('show')
        //<div class="modal-backdrop fade show"></div>
    }
    let element = document.createElement("div")
    element.setAttribute("id", "shadow")
    element.classList.add('modal-backdrop')
    element.classList.add('fade')
    element.classList.add('show')
    document.querySelector('body').appendChild(element)
    setTimeout(()=> {
        document.querySelector('#inlineForm').classList.add('show')
        document.querySelector('.'+modal).style.display = "flex"
    },200)
    document.querySelector('.'+modal).style.display = "flex"
}

export {
    Modals,
    showModal
}