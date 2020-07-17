import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {LogInOut, Refresh} from "../../redux/profile-reducer";

class LoginContainer extends React.Component {
    componentDidMount() {
        const options = {
            headers: {
                email: 'mimic@gmail.com',
                password: 'mimic',
                withCredentials: true
            }
        };
        debugger
        axios.post('http://localhost:4000/auth/login', {}, options)
            .then(response => {
                debugger
                if (response.data.accessToken != null) {
                    //debugger
                    let AuthData = {
                        email: options.headers.email,
                        password: options.headers.password,
                        id: response.data.userId,
                        isAuth: true
                    }
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('email', options.headers.email);
                    localStorage.setItem('password', options.headers.password)
                    localStorage.setItem('id', response.data.userId)
                    localStorage.setItem('isAuth', true);
                    this.props.LogInOut(true);
                    //this.props.SetUserAuthData(AuthData);
                }
            })
    }

    render() {
        return <div>
            Login
        </div>
    }
};

let mapStateToProps = (state) => {
    return {a: 1}
};
export default connect(mapStateToProps, {
    LogInOut
    // SetKeyAndId
})(LoginContainer);
