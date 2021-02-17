import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { listParticipants } from '../../actions/participantActions';
import Styles from './ParticipantListScreen.module.scss';
import Loader from '../../components/Loader/Loader';

const ParticipantListScreen = (props) => {

    useEffect(() => {
        props.onListParticipants();
    },[props.onListParticipants]);

    return (
        <div className={Styles.ParticipantContainer}>
            {props.loading ? <Loader/> : (
                <div className={Styles.Content}>
                    <h1 className={Styles.HeadingPrimary}>All Participants</h1>
                    <ul className={Styles.ParticipantList}>
                        {props.participants.map(participant => (
                            <li className={Styles.ParticipantItem}>
                            <Link to='/participant/1' className={Styles.ParticipantLink}>{participant.name}</Link>
                            <button className={Styles.Btn}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        participants: state.participantList.participants,
        loading: state.participantList.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onListParticipants: () => dispatch(listParticipants())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ParticipantListScreen);