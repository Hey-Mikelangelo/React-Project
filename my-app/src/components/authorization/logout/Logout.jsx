import React from "react";
import {connect} from "react-redux";
import {LogInOut, Refresh, SetUserProfile} from "../../redux/profile-reducer";

class LogoutContainer extends React.Component {
    componentDidMount() {
        /* const options = {
             headers: {
                 email: 'd@gmail.com',
                 password: 'd',
                 withCredentials: true
             }
         };
         debugger
         axios.post('http://localhost:4000/auth/login', {}, options)
         .then(response => {
                 debugger
                 if (response.data.accessToken != null) {
                     debugger
                     let AuthData = {
                         email: options.headers.email,
                         password: options.headers.password,
                         id: response.data.userId,
                         isAuth: true
                     }
                     localStorage.setItem('token', response.data.accessToken)
                     this.props.SetUserAuthData(AuthData);
                 }
             })*/
        debugger
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('password')
        localStorage.removeItem('id')
        localStorage.setItem('isAuth', false);
        this.props.LogInOut(false);
        this.props.SetUserProfile({ ProfileData: {
                name: "",
                profileImg: "",
                backgroundImg: "",
                followed: null,
                age: "",
                id: "",
                about: "",
                isActive: null,
            }})
        // this.props.SetUserAuthData({
        //     email: "",
        //     password: "",
        //     id: "",
        //     isAuth: false});
    }

    render() {
        return <div>
            Logout
        </div>
    }
};

let mapStateToProps = (state) => {
    return {
        a: 1
    }
};
export default connect(mapStateToProps, {
    LogInOut,
    SetUserProfile
    // SetKeyAndId
})(LogoutContainer);
