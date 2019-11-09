import {ADD_NOTI} from "../actionTypes";

export const setNotify = (show) => ({type: ADD_NOTI, show});

const box = {
    success: {
        icon: "pe-7s-cup",
        level: "success"
    },
    warning: {
        icon: "pe-7s-attention",
        level: "warning"
    },
    error: {
        icon: "pe-7s-close-circle",
        level: "error"
    }
}

export function clearNotify(){
    return dispatch => {
        dispatch(setNotify({}));
    }
}

export function addNotify(level, msg){
    return dispatch => {
        let show = {...box[level], msg};
        dispatch(setNotify(show));
    }
}
