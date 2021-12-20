import axios from "axios"

const sendFormWithAttach = (url, form, type) => {
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      const send = new FormData()
      Object.keys(form).forEach((key) => {
        if (key == "files"){
            if (form[key].length>1) {
                form[key].forEach((el) =>{
                    send.append("files", form[key]);
                })
            } else {
                send.append('file',  form[key][0])
            }
        }
        send.append(key, form[key])
      })
      if(type=='post'){
        return axios.post(url, send,  {headers: { 'content-type': 'multipart/form-data' }})
      } else if(type == 'put'){
        return axios.put(url, send,  {headers: { 'content-type': 'multipart/form-data' }})
      }
}
export default class ApiService{
    login = (phone, pass) => {
        return axios.post("/auth/sign-in", {phone,pass})
    }

    register = (data) => {
        return axios.post("/auth/registration-start", data)
    }
    
    verifyCode = (data) => {
        return axios.post("/auth/registration-finish", data)
    }

    getObject = (id) => {
        return axios.get("/api/objects/"+id, null)
    }
    getCities = () => {
        return axios.get("/api/cities")
    }

    getReservePrevent = (id) => {
        return axios.get("/api/reserve-prevent/"+id)
    }

    addToReservePrevent = (data) => {
        return axios.put("/api/reserve-prevent/", data)
    }

    removeFromReservePrevent = (data) => {
        return axios.delete("/api/reserve-prevent/", data)
    }

    getBlackList = () => {
        return axios.get("/api/black-list/")
    }

    addToBlackList = (data) => {
        return axios.put("/api/black-list/", data)
    }

    removeFromBlackList = (data) => {
        return axios.delete("/api/black-list/", data)
    }

    saveObject = (data) => {
        return axios.post("/api/objects", data)
    }

    getKitchenTypes = () => {
        return axios.get("/api/kitchen-types")
    }

    getAllObjectAtributes = () => {
        return axios.get("/api/object-atributes/")
    }

    getObjectTypes = () => {
        return axios.get("/api/object-types/")
    }

    getObjectsOfTheUser = () => {
        return axios.get("/api/objects/")
    }

    sendObjectAttributes = (data) =>{
        return axios.put("/api/object-atributes/", data)
    }

    sendObjectsKitchens = (data) =>{
        return axios.put("/api/kitchen-types/", data)
    }

    //нужно для проверки заполнена уже инфа или нет
    checkUserInfo = () => {
        return axios.get("/api/users-info/check/")
    }
    sendUserInfo = () => {
        return axios.put("/api/users-info/")
    }

    ping = () => {
        return axios.get("/api/ping")
    }

    logout = () => {
        return axios.get("/auth/logout")
    }

    getServices = (id) => {
        return axios.get("/api/categories/object/"+id)
    }

    getActions = (id) => {
        return axios.get("/api/actions/object/"+id)
    }

    getPhotos = (id) => {
        return axios.get("/api/objects/images/"+id)
    }

    getEmployees = (id) => {
        return axios.get("/api/employee/"+id)
    }

    getPanoramas = (id) => {
        return axios.get("/api/panoramas/object/"+id)
    }

    getSchemes = (id) => {
        return axios.get("/api/schemes/"+id)
    }

    getFurnitures = () => {
        return axios.get("/api/furnitures/")
    }

    addTable = (form) => {
        return sendFormWithAttach("/api/tables", form, "put")
    }
    addMarker = (form) => {
        return axios.put("/api/markers", form)
    }

    addPanorama = (form) => {
        return sendFormWithAttach("/api/panoramas", form, "put")
    }

    addHall = (form) => {
        return axios.put("/api/halls", form)
    }

    putIconAttrs = (form) => {
        return axios.put("/api/icons/attrs", form)
    }
}


/*
const sendFormAttach = (url, form, file, showtoast, type=null, updateCallback = null) => {
      
*/
