import React,{useEffect} from 'react';
import Styles from './EventRegisterScreen.module.scss';
import {connect} from 'react-redux';

const EventRegisterScreen = (props) => {

    useEffect(() => {
        if(!props.userInfo){
            props.history.push('/register')
        }
    }, [])

    return (
        <div className={Styles.FormContainer}>
            <form className={Styles.Form}>
            <h1 className={Styles.HeadingPrimary}>Event Registration</h1>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Username</label>
                    <input type='text' className={Styles.Input} placeholder='' value=''/>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Email</label>
                    <input type='email' className={Styles.Input} placeholder='' value=''/>
                </div>
                <div className={Styles.InputContainer}>
                    <label className={Styles.InputLabel}>Contact</label>
                    <input type='number' className={Styles.Input} placeholder='' value=''/>
                </div>
                <button type='submit' className={Styles.Btn}>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userRegister.userInfo
    }
}

export default connect(mapStateToProps)(EventRegisterScreen);
