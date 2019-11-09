import {setUser} from "../store/actions/user";
import {setAuthorizationToken} from "./api";
import jwtDecode from "jwt-decode";

export function checkStore(store){
    if(localStorage.token){
        setAuthorizationToken(localStorage.token);
        try{
            store.dispatch(setUser(jwtDecode(localStorage.token)));
        }catch(err){
            //if the token is tampered, change authenticate to false
            store.dispatch(setUser({}));
        }
    }
}
