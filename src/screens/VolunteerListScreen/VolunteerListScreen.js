import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { listVolunteers } from '../../actions/volunteerActions';
import Styles from './VolunteerListScreen.module.scss';
import Loader from '../../components/Loader/Loader';

const VolunteerListScreen = (props) => {

    useEffect(() => {
        props.onListVolunteers();
    },[props.onListVolunteers]);

    return (
        <div className={Styles.VolunteerContainer}>
            {props.loading ? <Loader/> : (
                <div className={Styles.Content}>
                    <h1 className={Styles.HeadingPrimary}>All Volunteers</h1>
                    <ul className={Styles.VolunteerList}>
                        <li className={Styles.VolunteerItem}>
                            <Link to='' className={Styles.VolunteerLink}>John Ducket</Link>
                            <button className={Styles.Btn}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        <li className={Styles.VolunteerItem}>
                            <Link to='' className={Styles.VolunteerLink}>Shiv Mishra</Link>
                            <button className={Styles.Btn}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        <li className={Styles.VolunteerItem}>
                            <Link to='' className={Styles.VolunteerLink}>Super Saf</Link>
                            <button className={Styles.Btn}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        {props.volunteers.map(volunteer => (
                            <li className={Styles.VolunteerItem} key={volunteer._id}>
                            <Link to='/volunteer/1' className={Styles.VolunteerLink}>{volunteer.name}</Link>
                            <button className={Styles.Btn}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        ))}
                    </ul>
                    <Link to='/addvolunteer' className={Styles.AddBtn}>
                        <i className="fa fa-plus"></i>
                        <span>Add Volunteer</span></Link>
                </div>
            )}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        volunteers: state.volunteerList.volunteers,
        loading: state.volunteerList.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onListVolunteers: () => dispatch(listVolunteers())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(VolunteerListScreen);