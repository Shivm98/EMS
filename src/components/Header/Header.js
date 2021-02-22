import React from 'react';
import { AiOutlineLogout, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/userActions';

import Styles from "./Header.module.scss";
import userIcon from '../../images/userIcon.png';

const Header = (props) => {

    const logoutHandler = () => {
        props.onLogout()
    }

    return (
        <>
            <div className={Styles.Logo}>
                <span>Events</span>
            </div>

            <div className={Styles.UserNav}>
                {props.userLogin.userInfo
                ? 
               ( <>
                <Link to={`/user/`} className={Styles.LinkItem}>
                    <p>{props.userLogin.userInfo.name}</p>
                    <span>
                        <AiOutlineUser/>
                    </span>
                </Link>
                <Link to='/logout' className={Styles.LinkItem} onClick={logoutHandler}>
                    <p>Logout</p>
                    <span>
                        <AiOutlineLogout/>
                    </span>
                </Link>
                </>)
                : (
                    <>
                        <Link to='/register' className={Styles.LinkItem}>
                            <p>Register</p>
                            <span>
                                <AiOutlineUserAdd/>
                            </span>
                        </Link>
                        <Link to='/login' className={Styles.LinkItem}>
                        <p>Login</p>
                        <span>
                            <AiOutlineLogout/>
                        </span>
                    </Link>
                    </>
                  )
                }
                
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogin: state.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
