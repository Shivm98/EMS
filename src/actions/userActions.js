import axios from 'axios';
import SendHttpRequest from '../utils/SendHttpRequest';
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

export const logout = () => (dispatch) => {
    localStorage.removeItem('events');
    dispatch({type: USER_LOGOUT});
    document.location.href = '/login'
}

export const userRegister = (inputData) => {
    return async (dispatch, getState )=> {
        try{
            dispatch({type: USER_REGISTER_REQUEST});

            const userData = new FormData();

            userData.append('name', inputData.name);
            userData.append('email', inputData.email);
            userData.append('password', inputData.password);

            let url = '/register/participant'

            if(inputData.isVolunteer){
                url = '/register/volunteer';
            }

            const data = await SendHttpRequest('POST', url, userData);

            dispatch({type: USER_REGISTER_SUCCESS, payload: data});

        }catch(error){
            dispatch({type: USER_REGISTER_FAIL, error: error});
        }
    }
}

export const userLogin = (inputData) => {
    return async (dispatch,  getState) => {
        try{
            dispatch({type: USER_LOGIN_REQUEST});

            // const { userRegister } = getState();
            // const { userInfo } = userRegister;
            console.log(inputData);

            const userData = new FormData();
            userData.append('email', inputData['email']);
            userData.append('password', inputData['password']);
            userData.append('type', inputData['type']);

            let url = '/login'

            const data = await SendHttpRequest('POST', url, userData);
            const {accesstoken, user, refreshtoken} = data;

            dispatch({
                type: USER_LOGIN_SUCCESS, 
                token: accesstoken, 
                userInfo: user, 
                refreshToken: refreshtoken
            });
            
        }catch(error){
            console.log(error)
            dispatch({type: USER_LOGIN_FAIL, error: error});
        }
    }
}

export const getUserDetail = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: USER_DETAIL_REQUEST})

            const {userLogin} = getState();
            const {token} = userLogin;

            let data = await SendHttpRequest('GET', `/user/${id}`, null, token);

            dispatch({type: USER_DETAIL_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: USER_DETAIL_FAIL, error: error});
        }
    }
}