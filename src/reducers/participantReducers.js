import {
    PARTICIPANT_LIST_REQUEST,
    PARTICIPANT_LIST_SUCCESS,
    PARTICIPANT_LIST_FAIL
} from '../constants/participantConstants';

const initialState = {
    participants: [],
    error: null,
    loading: true
}

export const participantListReducer = (state = initialState, action) => {
    switch(action.type){
        case PARTICIPANT_LIST_REQUEST:
            console.log("Inside participant reducer request********8888888")
            return {
                ...state,
                loading: true
            }
        
        case PARTICIPANT_LIST_SUCCESS:
            console.log("Inside participant reducer success********8888888")
            return {
                ...state,
                loading: false,
                participants: action.payload
            }
        
        case PARTICIPANT_LIST_FAIL:
            
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default: return state;
    }
}