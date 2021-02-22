import axios from 'axios';
import SendHttpRequest from '../utils/SendHttpRequest';
import {
    EVENT_LIST_REQUEST,
    EVENT_LIST_SUCCESS,
    EVENT_LIST_FAIL,
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
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
import sendHttpRequest from '../utils/SendHttpRequest';

export const listEvents = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: EVENT_LIST_REQUEST });

            const { userLogin } = getState();
            const { token } = userLogin;

            let data = await SendHttpRequest('GET', '/user/events', null, token );
            console.log(data);

            // fetching data into array.
            const fetchedEvents = [];
            for(let key in data.events){
                fetchedEvents.push(data.events[key])
            }  

            dispatch({
                type: EVENT_LIST_SUCCESS,
                payload: fetchedEvents
            })

             // Saving the events to the local storage
            // let eventList = {};
            // for (let event of fetchedEvents){
            //     eventList[event._id] = {...event}
            // }
            localStorage.setItem('events', JSON.stringify(fetchedEvents));

        } catch (error) {
            dispatch({
                type: EVENT_LIST_FAIL,
                payload: error
            });
        }
    }
};


export const eventDetails = (id) => {
    return async dispatch => {
        try{
            dispatch({type: EVENT_DETAILS_REQUEST});
            console.log(id)
            const eventsFetchedFromLocalStorage = JSON.parse(localStorage.getItem('events'));
            const event = eventsFetchedFromLocalStorage.find(event => {
                console.log(event._id)
                return id === event._id
            })

            console.log(event)

            dispatch({type: EVENT_DETAILS_SUCCESS, payload: event});
        }catch(err) {
            dispatch({type:EVENT_DETAILS_FAIL, error: err})
        }
    }
}

export const createEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: EVENT_CREATE_REQUEST });
            let url = '';
            
            url = "/user/add-event/";

            const { userLogin } = getState();
            const { token } = userLogin;

            let eventData = new FormData();
           
            eventData.append('name', event['name'])
            eventData.append('description', event['description'])
            eventData.append('startdate', event['startdate'])
            eventData.append('enddate', event['enddate'])
            eventData.append('organizer', event['organizer'])

            // const { data } = await axios.post(url, eventData, config);
            const data = await SendHttpRequest('POST', url, eventData, token);

            const fetchedEvents = [];
            for (let key in data){
                fetchedEvents.push({
                    ...data[key]
                });
            }
            dispatch({
                type: EVENT_CREATE_SUCCESS,
                payload: fetchedEvents
            });

        } catch (error) {
            console.log(error);
            dispatch({ type: EVENT_CREATE_FAIL, error: error });
        }
    }
}

export const deleteEvent = (id) => {
    return async (dispatch, getState) => {
        try{
            dispatch({type: EVENT_DELETE_REQUEST});

            const {userLogin} = getState();
            const {token} = userLogin;

            await SendHttpRequest('DELETE', `user/delete-event/${id}`, null, token);
            dispatch(listEvents())

            dispatch({type: EVENT_DELETE_SUCCESS});
        }catch(error){
            dispatch({type: EVENT_DELETE_FAIL, error: error})
        }
    }
}

export const registerEvent= (eventId, userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: EVENT_REGISTER_REQUEST});

            const {userLogin} = getState();
            const {token} = userLogin;

            const userData = new FormData();
            userData.append('userId', userId);

            let data = await SendHttpRequest('POST', `/user/register/${eventId}`, userData, token);

            dispatch({type: EVENT_REGISTER_SUCCESS, payload: data});
        } catch (error) {

            dispatch({type: EVENT_REGISTER_FAIL, error: error});
        }
    }
}