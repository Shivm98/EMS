import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Styles from "./Header.module.scss";

const Header = (props) => {
    return (
        <>
            <div className={Styles.Logo}>
                <span>Events</span>
            </div>

            <div className={Styles.UserNav}>
                {props.userInfo 
                ? <Link to='/logout' className={Styles.LinkItem}>Logout</Link>
                : (
                    <>
                        <Link to='/register' className={Styles.LinkItem}>Register</Link>
                        <Link to='/login' className={Styles.LinkItem}>Login</Link>
                    </>
                  )
                }
                
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userRegister.userInfo
    }
}


export default connect(mapStateToProps)(Header)
