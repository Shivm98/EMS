import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteVolunteer, listVolunteers } from '../../actions/volunteerActions';
import Styles from './VolunteerListScreen.module.scss';
import Loader from '../../components/Loader/Loader';

const VolunteerListScreen = (props) => {

    useEffect(() => {
        if(props.userInfo){
            props.onListVolunteers();
        }else{
            props.history.push('/login');
        }
    },[props.onListVolunteers, props.successDelete]);

    const deleteHanlder = (id) => {
        props.onDeleteVolunteer(id)
    }

    return (
        <div className={Styles.VolunteerContainer}>
            {props.loading ? <Loader/> : (
                <div className={Styles.Content}>
                    <h1 className={Styles.HeadingPrimary}>All Volunteers</h1>
                    <ul className={Styles.VolunteerList}>
                        {props.volunteers.map(volunteer => (
                            <li className={Styles.VolunteerItem} key={volunteer._id}>
                            <Link to={`/user/${volunteer._id}`} className={Styles.VolunteerLink}>{volunteer.name}</Link>
                            <button className={Styles.Btn} onClick={() => deleteHanlder(volunteer._id)}>
                                <i className='fas fa-trash'></i>
                            </button>
                        </li>
                        ))}
                    </ul>

                     {
                        props.userInfo && props.userInfo.type === 'admin' 
                        ? (<Link to='/addvolunteer' className={Styles.AddBtn}>
                        <i className="fa fa-plus"></i>
                        <span>Add Volunteer</span></Link>)
                        : null
                    }
                    
                </div>
            )}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        volunteers: state.volunteerList.volunteers,
        loading: state.volunteerList.loading,
        userInfo: state.userLogin.userInfo,
        successDelete: state.volunteerDelete.success,
        loadingDelete: state.volunteerDelete.loading,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onListVolunteers: () => dispatch(listVolunteers()),
        onDeleteVolunteer: (id) => dispatch(deleteVolunteer(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(VolunteerListScreen);