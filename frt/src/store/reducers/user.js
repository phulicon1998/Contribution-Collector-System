import {ADD_USER, REMOVE_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    data: {}
}

export default (state = DEFAULT_STATE, action) => {
    const {data, type} = action;
    switch (type) {
        case ADD_USER:
            return {
                isAuthenticated: true,
                data
            };
        case REMOVE_USER:
            return DEFAULT_STATE;
        default:
            return state;
    }
}
