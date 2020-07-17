import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import * as axios from "axios";
import {SetUserProfile} from "../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {dbApi} from "../API/Api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        if(localStorage.getItem('isAuth')){
            let userId = this.props.match.params.userId;
            dbApi.getProfile(userId)
                .then(data => {
                    this.props.SetUserProfile(data)
                })
        }
    }
    render() {
        let i = localStorage.getItem('isAuth')
        if(i === "true"){
            return (
                <Profile {...this.props}/>
            )
        }else{
            return <></>
        }

    }
}

let mapStateToProps = (state) => {
    return {
        backgroundImg: state.ProfilePage.ProfileData.backgroundImg,
        profileImg: state.ProfilePage.ProfileData.profileImg,
        name: state.ProfilePage.ProfileData.name,
        followed: state.ProfilePage.ProfileData.followed,
        age: state.ProfilePage.ProfileData.age,
        id: state.ProfilePage.ProfileData.id,
        about: state.ProfilePage.ProfileData.about,
        isActive: state.ProfilePage.ProfileData.isActive,
        token: localStorage.getItem('token')
    }
}

let WithRouterContainer = withRouter(ProfileContainer)

export default connect(mapStateToProps, {SetUserProfile})(WithRouterContainer);

