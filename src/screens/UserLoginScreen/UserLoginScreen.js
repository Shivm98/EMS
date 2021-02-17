import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { userLogin } from '../../actions/userActions';
import Loader from '../../components/Loader/Loader';

import Styles from './UserLoginScreen.module.scss';

const UserLoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVolunteer, setIsVolunteer] = useState(false);


    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onUserLogin(
            {
              email, password, isVolunteer
            }
        )
        props.history.push('/');
    }

    return (
        <div className={Styles.FormContainer}>
            {props.loading && <Loader/>}
            <form className={Styles.Form} onSubmit={formSubmitHandler}>
            <h1 className={Styles.HeadingPrimary}>User Login</h1>
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

const mapStateToProps = state => {
    return {
        loading: state.userLogin.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (user) => dispatch(userLogin(user)) 
    }
}

export default connect(null, mapDispatchToProps)(UserLoginScreen);
