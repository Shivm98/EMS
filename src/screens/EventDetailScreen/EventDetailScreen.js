import React, {useEffect} from 'react';
import Styles from './EventDetailScreen.module.scss';
import img1 from '../../images/music.jpg';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {eventDetails} from '../../actions/eventActions';

const EventDetailScreen = (props) => {
    const id = props.match.params.id;
    console.log(id)

    useEffect(() => {
        if(props.userInfo){
            props.onEventDetails(id);
        }else{
            props.history.push('/login');
        }
    },[props.match.params.id])

    return (
        <>
            <div className={Styles.Hero}>
                <h2 className={Styles.SecondaryHeading}>
                   <span> Unplugged Festival</span>
                </h2>
            </div>
            <div className={Styles.Container}>
                <div className={Styles.LeftContainer}>
                    <img src={img1} alt='music'/>
                </div>
                <div className={Styles.RightContainer}>
                    <h1 className={Styles.HeadingPrimary}>
                        {props.event.name}
                    </h1>
                    <p className={Styles.Meta}> <span>Start Date:</span> {props.event.startdate}</p>
                    <p className={Styles.Meta}> <span>End Date:</span> {props.event.enddate}</p>
                    <p className={Styles.Meta}> <span>Organized By:</span> {props.event.organizer}</p>
                </div>
            </div>
            <div className={Styles.Description}>
                <p className={Styles.Desc}>
                    {props.event.description}
                </p>
                <Link to={`/event/${props.event._id}/register/`} className={Styles.Btn}>Register</Link>
            </div>
        </>
    );
};

const mapStateToProps = state => {
   return {
        event: state.eventDetails.event,
        userInfo: state.userLogin.userInfo
   }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventDetails: (id) => dispatch(eventDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
