import React, { useState, useEffect } from 'react';
import { createEvent } from '../../actions/eventActions';
import {connect} from 'react-redux';

import Styles from './AddEventScreen.module.scss';

const AddEventScreen = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [organizer, setOrganizer] = useState('');

    useEffect(() => {
        if(!props.userInfo){
            props.history.push('/login')
        }
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onEventCreate(
            {
             name, description, startdate, enddate, organizer
            }
        )
        props.history.push('/events');
    }

    return (
        <div className={Styles.FormContainer}>
            <form className={Styles.Form} onSubmit={formSubmitHandler}>
                <h1 className={Styles.HeadingPrimary}>Add Event</h1>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Name</label>
                    <input
                        type='text'
                        className={Styles.Input}
                        placeholder={name}
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Description</label>
                    <textarea
                        className={Styles.Input}
                        placeholder={description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Start Date</label>
                    <input
                        type='date'
                        className={Styles.Input}
                        placeholder={startdate}
                        value={startdate}
                        onChange={(e) => setStartdate(e.target.value)} />
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>End date</label>
                    <input
                        type='date'
                        className={Styles.Input}
                        placeholder={enddate}
                        value={enddate}
                        onChange={(e) => setEnddate(e.target.value)} />
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Organizer</label>
                    <input
                        type='text'
                        className={Styles.Input}
                        placeholder={organizer}
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)} />
                </div>
                <button type='submit' className={Styles.Btn}>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userLogin.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventCreate: (event) => dispatch(createEvent(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
