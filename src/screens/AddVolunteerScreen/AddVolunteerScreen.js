import React, { useState, useEffect } from 'react';
import { createVolunteer } from '../../actions/volunteerActions';
import {connect} from 'react-redux';

import Styles from './AddVolunteerScreen.module.scss';

const AddVolunteerScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [password, setPassword] = useState('');
    // const [events, setEvents] = useState([]);

    useEffect(() => {
        if(!props.userInfo){
            props.history.push('/login')
        }
    }, [])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onVolunteerCreate(
            {
             name, email, type, password
            }
        )
        props.history.push('/volunteers');
    }

    return (
        <div className={Styles.FormContainer}>
            <form className={Styles.Form} onSubmit={formSubmitHandler}>
                <h1 className={Styles.HeadingPrimary}>Add Volunteer</h1>
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
                    <label className={Styles.InputLabel}>Email</label>
                    <input
                        type='email'
                        className={Styles.Input}
                        placeholder={email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Password</label>
                    <input
                        type='password'
                        className={Styles.Input}
                        placeholder={password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
               
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Type</label>
                    <input
                        type='text'
                        className={Styles.Input}
                        placeholder={type}
                        value={type}
                        onChange={(e) => setType(e.target.value)} />
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
        onVolunteerCreate: (volunteer) => dispatch(createVolunteer(volunteer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVolunteerScreen);
