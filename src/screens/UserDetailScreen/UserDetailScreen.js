import React,{useEffect} from 'react';
import Styles from './UserDetailScreen.module.scss';
import userIcon from '../../images/userIcon.png';
import Loader from '../../components/Loader/Loader';
import {connect} from 'react-redux';
import { getUserDetail } from '../../actions/userActions';

const UserDetailScreen = (props) => {
    const userId = props.match.params.id;

    useEffect(() => {
        if(!props.userInfo){
            props.history.push('/login')
        }else{
            props.onGetUserDetail(userId);
        }
    }, [userId]);

    return (
        <div className={Styles.Container}>
        {props.loading ? <Loader/> : props.userDetail ? (
            <div className={Styles.Content}>
                    <div className={Styles.Top}>
                        <div className={Styles.ImgContainer}>
                            <img src={userIcon} alt="user icon"/>
                        </div>
                        <div className={Styles.Meta}>
                            <p className={Styles.Name}>{props.userDetail.user.name}</p>
                            <p className={Styles.Email}>{props.userDetail.user.email}</p>
                            <p className={Styles.Type}>{props.userDetail.user.type}</p>
                        </div>
                    </div>
                </div>
        ):null}
        </div>
    )           
}

const mapStateToProps = state => {
    return {
        userInfo: state.userLogin.userInfo,
        userDetail: state.userDetail.userDetail,
        loading: state.userDetail.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserDetail: (id) => dispatch(getUserDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
