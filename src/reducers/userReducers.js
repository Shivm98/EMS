import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
} from '../constants/userConstants';


export const userRegisterReducer = (state= {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: true
            }
        default: 
            return state
    }
}

export const userLoginReducer = (state={}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.userInfo,
                token: action.token,
                refreshToken: action.refreshToken,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: true
            }
        case USER_LOGOUT:
            return { }
        default: 
            return state
    }
}


export const userDetailReducer = (state={}, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {
                loading: true
            }
        case USER_DETAIL_SUCCESS:
            return {
                loading: false,
                userDetail: action.payload 
            }
        case USER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state;

    }
}