import axios from 'axios';
import {
    PARTICIPANT_LIST_REQUEST,
    PARTICIPANT_LIST_SUCCESS,
    PARTICIPANT_LIST_FAIL
} from '../constants/participantConstants';

export const listParticipants = () => {
    return async dispatch => {
        try {
            dispatch({ type: PARTICIPANT_LIST_REQUEST });

            let {data} = await axios.get('/admin/participants');

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
