import {
    VOLUNTEER_LIST_REQUEST,
    VOLUNTEER_LIST_SUCCESS,
    VOLUNTEER_LIST_FAIL,
    VOLUNTEER_CREATE_REQUEST,
    VOLUNTEER_CREATE_SUCCESS,
    VOLUNTEER_CREATE_FAIL
} from '../constants/volunteerConstants';

const initialState = {
    volunteers: [],
    volunteer:'',
    loading: false
}
export const volunteerCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOLUNTEER_CREATE_REQUEST:
            return { 
                ...state,
                loading: true 
            }

        case VOLUNTEER_CREATE_SUCCESS:
            return { 
                ...state,
                loading: false,
                volunteers: state.volunteers.concat(action.payload)
            }
        case VOLUNTEER_CREATE_FAIL:
            return { 
                ...state,
                loading: false,
                error: action.error }
        default:
            return state
    }
}

export const volunteerListReducer = (state = initialState, action) => {
    switch(action.type){
        case VOLUNTEER_LIST_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case VOLUNTEER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                volunteers: action.payload
            }
        case VOLUNTEER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}