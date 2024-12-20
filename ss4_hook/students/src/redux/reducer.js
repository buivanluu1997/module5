import {combineReducers} from "redux";

const initialState = {
    account: null
}

function accountReducer (state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                account: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                account: null
            }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    user: accountReducer
})