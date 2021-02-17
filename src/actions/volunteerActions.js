import axios from 'axios';
import SendHttpRequest from '../utils/SendHttpRequest';

import {
    VOLUNTEER_LIST_REQUEST,
    VOLUNTEER_LIST_SUCCESS,
    VOLUNTEER_LIST_FAIL,
    VOLUNTEER_CREATE_REQUEST,
    VOLUNTEER_CREATE_SUCCESS,
    VOLUNTEER_CREATE_FAIL,
    VOLUNTEER_DETAILS_REQUEST,
    VOLUNTEER_DETAILS_SUCCESS,
    VOLUNTEER_DETAILS_FAIL
} from '../constants/volunteerConstants';

export const listVolunteers = () => {
    return async dispatch => {
        try {
            dispatch({ type: VOLUNTEER_LIST_REQUEST });

            // let {data} = await axios.get('/admin/volunteers');
            let data = await SendHttpRequest('GET', '/admin/volunteers');

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
    return async dispatch => {
        try{
            dispatch({type: VOLUNTEER_CREATE_REQUEST});


            let url = '';
            url = "/admin/add-volunteer/";

            // const config = {     
            //     headers: { 'content-type': 'application/x-www-form-urlencoded' }
            // }

            let volunteerData = new FormData();
           
            volunteerData.append('name', volunteer['name'])
            volunteerData.append('email', volunteer['email'])
            volunteerData.append('password', volunteer['password'])
            volunteerData.append('type', volunteer['type'])

            // const { data } = await axios.post(url, volunteerData, config);
            const data = await SendHttpRequest('POST', url, volunteerData);

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
