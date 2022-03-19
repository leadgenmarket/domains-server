import jwt_decode from "jwt-decode";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const getInfo = (key) => {
    let info = jwt_decode(getCookie("token"))
    return info[key]
}

export default getInfo