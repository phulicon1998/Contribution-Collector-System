import {ADD_USER, REMOVE_USER} from "../actionTypes";
import {apiAppCall, apiAppFdCall, setAuthorizationToken} from "../../services/api";

export const setUser = data => ({type:ADD_USER, data});

export const removeUser = () => ({type: REMOVE_USER});

export function firstAddProfileWithFd(data) {
    return async(dispatch) => {
        try {
            let {token, ...user} = await apiAppFdCall("put", "/api/auth/first/profile", data);
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            dispatch(setUser(user));
        } catch(err) {
            console.log(err);
        }
    }
}

export function firstAddProfile(data) {
    return async(dispatch) => {
        try {
            let {token, ...user} = await apiAppCall("put", "/api/auth/first/profile", data);
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            dispatch(setUser(user));
        } catch(err) {
            console.log(err);
        }
    }
}

export function logOut(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(removeUser());
    }
}

export function updateAuth({token, ...user}){
    return dispatch => {
        localStorage.setItem("token", token);
        dispatch(setUser(user));
    }
}

export function logIn(data){
    return async(dispatch) => {
        try{
            let {token, ...user} = await apiAppCall("post", "/api/auth/login", data);
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            dispatch(setUser(user));
        } catch(err) {
            console.log(err);
        }
    }
}
