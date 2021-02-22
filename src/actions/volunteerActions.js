import axios from 'axios';
import SendHttpRequest from '../utils/SendHttpRequest';

import {
    VOLUNTEER_LIST_REQUEST,
    VOLUNTEER_LIST_SUCCESS,
    VOLUNTEER_LIST_FAIL,
    VOLUNTEER_CREATE_REQUEST,
    VOLUNTEER_CREATE_SUCCESS,
    VOLUNTEER_CREATE_FAIL,
    VOLUNTEER_DELETE_REQUEST,
    VOLUNTEER_DELETE_SUCCESS,
    VOLUNTEER_DELETE_FAIL
} from '../constants/volunteerConstants';

export const listVolunteers = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: VOLUNTEER_LIST_REQUEST });

            const { userLogin } = getState();
            const { token } = userLogin;
            let data = await SendHttpRequest('GET', '/user/volunteers', null, token);

            const fetchedVolunteer = [];
            for(let key in data.volunteers){
                fetchedVolunteer.push(data.volunteers[key])
            }  

            dispatch({
                type: VOLUNTEER_LIST_SUCCESS,
                payload: fetchedVolunteer
            })

         
        } catch (error) {
            console.log(error)
            dispatch({
                type: VOLUNTEER_LIST_FAIL,
                payload: error
            });
        }
    }
};

export const createVolunteer = (volunteer) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: VOLUNTEER_CREATE_REQUEST});


            let url = "/admin/add-volunteer/";

            const { useLogin } = getState();
            const {token} = useLogin;

            let volunteerData = new FormData();
           
            volunteerData.append('name', volunteer['name'])
            volunteerData.append('email', volunteer['email'])
            volunteerData.append('password', volunteer['password'])
            volunteerData.append('type', volunteer['type'])

            const data = await SendHttpRequest('POST', url, volunteerData, token);

            const fetchedVolunteers = [];
            for (let key in data){
                fetchedVolunteers.push({
                    ...data[key]
                });
            }
            dispatch({
                type: VOLUNTEER_CREATE_SUCCESS,
                payload: fetchedVolunteers
            });

        }catch(error){
            console.log(error);
            dispatch({type: VOLUNTEER_CREATE_FAIL, error: error});
        }
    }
}


export const deleteVolunteer = (id) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: VOLUNTEER_DELETE_REQUEST});

            const {userLogin} = getState();
            const {token} = userLogin;

            await SendHttpRequest('DELETE', `user/delete-volunteer/${id}`, null, token);
            
            dispatch({type: VOLUNTEER_DELETE_SUCCESS});
            dispatch(listVolunteers())
        }catch(error){
            dispatch({type: VOLUNTEER_DELETE_FAIL, error: error})
        }
    }
}