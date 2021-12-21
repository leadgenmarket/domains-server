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
    login = (login, pass) => { 
        console.log(login)
        console.log(pass)
        return axios.post("/sign-in", {login,pass})
    }

    ping = () => {
        return axios.get("/api/ping")
    }

    logout = () => {
        return axios.get("/api/logout")
    }

    domainsList = () => {
        return axios.get("/api/domains")
    }

    domain = (id) => {
        return axios.get("/api/domains/"+id)
    }

    addDomain = () => {
        return axios.put("/api/domains/")
    }

    deleteDomain = (id) => {
        return axios.delete("/api/domains/"+id)
    }

    templatesList = () => {
        return axios.get("/api/templates/")
    }

    citiesList = () => {
        return axios.get("/api/cities/")
    }

    organizationsList = () => {
        return axios.get("/api/organizations/")
    }
}
