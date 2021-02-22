import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { 
    eventCreateReducer, 
    eventDetailReducer, 
    eventListReducer,
    eventDeleteReducer,
    eventRegisterReducer
} from './reducers/eventReducers';
import { 
    volunteerDeleteReducer,
    volunteerListReducer 
} from './reducers/volunteerReducers';

import {
    participantListReducer
} from './reducers/participantReducers';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer
} from'./reducers/userReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    eventCreate: eventCreateReducer,
    eventList: eventListReducer,
    eventDetails: eventDetailReducer,
    eventDelete: eventDeleteReducer,
    eventRegister: eventRegisterReducer,
    volunteerList: volunteerListReducer,
    volunteerDelete: volunteerDeleteReducer,
    participantList: participantListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDetail: userDetailReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;