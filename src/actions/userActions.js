import axios from 'axios';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from '../constants/userConstants';

export const userRegister = (inputData) => {
    return async dispatch => {
        try{
            dispatch({type: USER_REGISTER_REQUEST});

            const config = {
                headers: {'content-type': 'application/x-www-form-urlencoded'}
            }

            const userData = new FormData();

            userData.append('name', inputData.name);
            userData.append('email', inputData.email);
            userData.append('password', inputData.password);

            let url = '/register/participant'

            if(inputData.isVolunteer){
                url = '/register/volunteer';
            }

            const {data} = await axios.post(url, config, userData);

            dispatch({type: USER_REGISTER_SUCCESS, payload: data});

        }catch(error){
            dispatch({type: USER_REGISTER_FAIL, error: error});
        }
    }
}

export const userLogin = (inputData) => {
    return async dispatch => {
        try{
                dispatch({type: USER_LOGIN_REQUEST});

                const config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    } 
                }   

                const userData = new FormData();
                userData.append('email', inputData['email']);
                userData.append('password', inputData['password']);

                let url = '/participant/login'

            if(inputData.isVolunteer){
                url = '/volunteer/login';
            }

                const {data} = axios.post(url, config, userData);

                dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        }catch(error){
            dispatch({type: USER_LOGIN_FAIL, error: error});
        }
    }
}

