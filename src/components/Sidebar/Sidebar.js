import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';

import Styles from "./Sidebar.module.scss"

const Sidebar = (props) => {
    return (
            <ul className={Styles.SideNav}>
                <li className={Styles.SideNavItem}>
                    <NavLink to='/events' className={Styles.SideNavLink} >
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                        <span>Events</span> 
                    </NavLink>
                </li>
                {props.userInfo ? (
                    <>
                        <li className={Styles.SideNavItem}>
                        <NavLink to='/participants' className={Styles.SideNavLink}> 
                            <i className="fa fa-users" aria-hidden="true"></i>
                            <span>Participants</span>
                        </NavLink>
                        </li>
                        <li className={Styles.SideNavItem}>
                            <NavLink to='/volunteers' className={Styles.SideNavLink}>
                                <i className="fa fa-puzzle-piece" aria-hidden="true"></i>
                                <span>Volunteers</span>
                            </NavLink>
                        </li>
                    </>
                ): null}
                
            </ul>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.userLogin.userInfo
    }
}

export default connect(mapStateToProps)(Sidebar);
