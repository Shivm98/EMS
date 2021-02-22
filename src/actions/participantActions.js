import axios from 'axios';
import {
    PARTICIPANT_LIST_REQUEST,
    PARTICIPANT_LIST_SUCCESS,
    PARTICIPANT_LIST_FAIL
} from '../constants/participantConstants';
import sendHttpRequest from '../utils/SendHttpRequest';

export const listParticipants = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: PARTICIPANT_LIST_REQUEST });

            const {userLogin} = getState();
            const {token} = userLogin;
            console.log(userLogin)

            // let {data} = await axios.get('/admin/participants');
            let data = await sendHttpRequest('GET', 'user/participants',null, token);

            const fetchedParticipant = [];
            for(let key in data.participants){
                fetchedParticipant.push(data.participants[key])
            }  
            console.log("Inside participant actions********8888888")

            dispatch({
                type: PARTICIPANT_LIST_SUCCESS,
                payload: fetchedParticipant
            })

         
        } catch (error) {
            dispatch({
                type: PARTICIPANT_LIST_FAIL,
                payload: error
            });
        }
    }
};
