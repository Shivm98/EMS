
import {
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_REGISTER_REQUEST,
    EVENT_REGISTER_SUCCESS,
    EVENT_REGISTER_FAIL
} from '../constants/eventConstants';

const initialState = {
    events: [],
    event: '',
    loading: false
}

export const eventCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_CREATE_REQUEST:
            return { 
                ...state,
                loading: true 
            }

        case EVENT_CREATE_SUCCESS:
            return { 
                ...state,
                loading: false,
                events: state.events.concat(action.payload)
            }
        case EVENT_CREATE_FAIL:
            return { 
                ...state,
                loading: false,
                error: action.error }
        default:
            return state
    }
}

export const eventListReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENT_LIST_REQUEST:
            return { 
                ...state,
                loading: true
             }
        case EVENT_LIST_SUCCESS:
            return { 
                ...state,
                loading: false, 
                events: action.payload
            }
        case EVENT_LIST_FAIL:
            return { 
                ...state,
                loading: false, 
                error: action.error 
            }
        default:
            return state
    }
}

export const eventDetailReducer = (state = initialState, action) => {
    switch(action.type){
        case EVENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                event: action.payload
            }
        case EVENT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const eventDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case EVENT_DELETE_REQUEST:
            return{
                ...state,
               loading: true 
            }
        case EVENT_DELETE_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true
            }
        case EVENT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            }
        default: return state;
    }
}

export const eventRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case EVENT_REGISTER_REQUEST:
            return {
                loading: true
            }
        case EVENT_REGISTER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case EVENT_REGISTER_FAIL:
            return {
                loading: false,
                error: action.error
            }
        default: return state;
    }
}