import React,{useEffect, useState} from 'react';
import Styles from './EventRegisterScreen.module.scss';
import {connect} from 'react-redux';
import { registerEvent } from '../../actions/eventActions';

const EventRegisterScreen = (props) => {
    const [event, setEvent] = useState('');
    const eventId = props.match.params.id;
    
    useEffect(() => {
        if(!props.userInfo){
            props.history.push('/login');
        }
        const event = props.events.find(event => eventId === event._id);
        setEvent(event)
    }, [eventId])
    
    const clickHandler = (event) => {
        event.preventDefault();
        const userId = props.userInfo.id;
        props.onRegister(eventId, userId);
    }

    return (
        <div className={Styles.FormContainer}>
            <form className={Styles.Form}>
                <h1 className={Styles.HeadingPrimary}>Event Registration</h1>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Username</label>
                    <p>{props.userInfo.name}</p>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Email</label>
                    <p>{props.userInfo.email}</p>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Event Name</label>
                    <p>{event.name}</p>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Event Description</label>
                    <p>{event.description}</p>
                </div>
                {props.userInfo && <button type='submit' className={Styles.Btn} onClick={clickHandler}>Submit</button>}
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userLogin.userInfo,
        events: state.eventList.events
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (eventId, userId) => dispatch(registerEvent(eventId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRegisterScreen);
