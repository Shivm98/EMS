import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listEvents, deleteEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';

import Styles from './EventListScreen.module.scss';
import Loader from '../../components/Loader/Loader';

const EventListScreen = (props) => {

    useEffect(() => {
        props.onListEvents();
    }, []);

    const deleteHandler = (event, id) => {
        event.preventDefault();
        props.onDeleteEvent(id);
    }

    return (
        <div className={Styles.EventContainer}>
            {props.loading || props.deleteLoading ? <Loader/> : 
            
                <div className={Styles.Content}>
                    <h1 className={Styles.HeadingPrimary}>All Events</h1>
                    <ul className={Styles.EventList}>
                        {props.listEvents.map(event => (
                                <li className={Styles.EventItem} key={event.time + event.name}>
                                <Link to={`/event/${event._id}/`} className={Styles.EventLink}>{event.name}</Link>
                                <button className={Styles.Btn} onClick={(e) => deleteHandler(e,event._id)}>
                                    <i className='fas fa-trash'></i>
                                </button>
                                </li>
                        ))}
                    </ul>
                    <Link to='/addevent' className={Styles.AddBtn}>
                        <i className="fa fa-plus"></i>
                        <span>Add Event</span></Link>
                </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        listEvents: state.eventList.events,
        loading: state.eventList.loading,
        deleteLoading: state.eventDelete.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onListEvents: () => dispatch(listEvents()),
        onDeleteEvent: (id) => dispatch(deleteEvent(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventListScreen);
