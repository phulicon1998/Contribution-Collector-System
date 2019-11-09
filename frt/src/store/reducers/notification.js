import {ADD_NOTI} from "../actionTypes";

const DEFAULT_STATE = {
    status: false,
    show: {}
}

export default (state = DEFAULT_STATE, action) => {
    const {show, type} = action;
    switch (type) {
        case ADD_NOTI:
            return {
                status: !!Object.keys(show).length,
                show
            };
        default:
            return state;
    }
}
