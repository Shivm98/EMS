import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { 
    eventCreateReducer, 
    eventDetailReducer, 
    eventListReducer,
    eventDeleteReducer
} from './reducers/eventReducers';
import { 
    volunteerListReducer 
} from './reducers/volunteerReducers';

import {
    participantListReducer
} from './reducers/participantReducers';

import {
    userLoginReducer,
    userRegisterReducer
} from'./reducers/userReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    eventCreate: eventCreateReducer,
    eventList: eventListReducer,
    eventDetails: eventDetailReducer,
    eventDelete: eventDeleteReducer,
    volunteerList: volunteerListReducer,
    participantList: participantListReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;