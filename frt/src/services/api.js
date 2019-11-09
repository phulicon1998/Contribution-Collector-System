import axios from "axios";

export function setAuthorizationToken(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export async function apiAppCall(method, path, data){
    try {
        return (await axios[method](path, data)).data;
    } catch(err) {
        throw err.response.data.errorMsg;
    }
}

export async function apiAppFdCall(method, url, data) {
    try {
        return (await axios({
            method : method,
            url: url,
            data: data,
            headers: {"content-type": "multipart/form-data"}
        })).data;
    } catch(err) {
        throw err.response.data.errorMsg;
    }
}
