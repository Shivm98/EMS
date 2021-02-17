import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { userRegister } from '../../actions/userActions';

import Styles from './UserRegisterScreen.module.scss';

const UserRegisterScreen = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVolunteer, setIsVolunteer] = useState(false);


    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onUserRegister(
            {
             name, email, password, isVolunteer
            }
        )
        props.history.push('/login');
    }

    return (
        <div className={Styles.FormContainer}>
            <form className={Styles.Form} onSubmit={formSubmitHandler}>
            <h1 className={Styles.HeadingPrimary}>User Registration</h1>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Username</label>
                    <input type='text' className={Styles.Input} placeholder='Username' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Email</label>
                    <input type='email' className={Styles.Input} placeholder='Email' value={email}  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Password</label>
                    <input type='password' className={Styles.Input} placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={Styles.InputContainer}>
                    <div className={Styles.CheckBoxContainer}>
                        <label className={Styles.InputLabel}>Is Volunteer</label>
                        <input type='checkbox' className={Styles.CheckBox}  name='IsVolunteer' value={isVolunteer}  onChange={(e) => setIsVolunteer(prev=> !prev)}/>
                    </div>
                </div>
                <button type='submit' className={Styles.Btn}>Submit</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUserRegister: (user) => dispatch(userRegister(user)) 
    }
}

export default connect(null, mapDispatchToProps)(UserRegisterScreen);
