import React from "react"

const SuccessModal = () => {
    const closeModal = (e) => {
        e.preventDefault()
        document.querySelector('#inlineForm').style.display = "none"
        document.querySelector('#inlineForm').classList.remove('show')
        document.querySelector('body').classList.remove('modal-open')
        document.querySelectorAll('.modal-dialog').forEach((modal) => {
            modal.style.display = "none"
        })
        document.querySelector('.modal-backdrop').remove()  
    }
    return <React.Fragment >
               <div class="modal-dialog modal-dialog-centered modal-success">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myModalLabel110">Успешно</h5>
                            <button type="button" className="close" onClick={closeModal} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body" style={{textAlign:"center"}}>
                            <br />
                            <span className="text-success" style={{fontSize:"20px"}}>Изменения успешно внесенны</span>
                            <br />
                            <br />
                        </div>
                        <div class="modal-footer">
                            <button onClick={closeModal} type="button" class="btn btn-success waves-effect waves-float waves-light" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
                <div class="modal-dialog modal-dialog-centered modal-danger">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myModalLabel110">Ошибка</h5>
                            <button type="button" className="close" onClick={closeModal} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body" style={{textAlign:"center"}}>
                            <br />
                            <span className="text-danger" style={{fontSize:"20px"}}>Произошла ошибка при сохранении изменений</span>
                            <br />
                            <br />
                        </div>
                        <div class="modal-footer">
                            <button onClick={closeModal} type="button" class="btn btn-danger waves-effect waves-float waves-light" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
        </React.Fragment>
}

export default SuccessModal