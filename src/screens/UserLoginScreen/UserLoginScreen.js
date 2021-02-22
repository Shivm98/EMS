import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../../actions/userActions';
import Loader from '../../components/Loader/Loader';

import Styles from './UserLoginScreen.module.scss';

const UserLoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');


    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onUserLogin(
            {
              email, password, type
            }
        )
    }

    useEffect(() => {
        if(props.userLogin.userInfo){
            props.history.push('/');
        }
    }, [props.userLogin])

    return (
        <div className={Styles.FormContainer}>
            {props.loading ? <Loader/> : 
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
                    <div className={Styles.InputContainer} >
                        <select className={Styles.Input} onChange={(e) => setType(e.target.value)}>
                            <option value="volunteer">Volunteer</option>
                            <option value="participant">Participant</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type='submit' className={Styles.Btn}>Submit</button>
                </form>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.userLogin.loading,
        userLogin: state.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (user) => dispatch(userLogin(user)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginScreen);
