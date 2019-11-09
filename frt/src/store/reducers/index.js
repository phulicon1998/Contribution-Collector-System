import {combineReducers} from "redux";
import user from "./user";
import notification from "./notification";

const rootReducer = combineReducers({user, notification});

export default rootReducer;
