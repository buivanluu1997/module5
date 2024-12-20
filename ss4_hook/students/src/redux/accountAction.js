//Viết các hàm trả về action {type, payload}
/*account = {
        username: "",
        password: "",
        role: ""
    }*/

import axios from "axios";
import {checkLogin} from "../service/accountService";

export function login(loginInfo) {
    /*return{
        type: "LOGIN",
        payload: account
    };*/

    //sử dụng redux-thunk
    return async (dispatch) => {
        //call API
        const account = await checkLogin(loginInfo);
        if (account != null) {
            dispatch({
                type: "LOGIN",
                payload: account
            })
            return true;
        } else {
            console.log("Login khong thanh cong")
            return false;
        }
    }
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: null
    };
}