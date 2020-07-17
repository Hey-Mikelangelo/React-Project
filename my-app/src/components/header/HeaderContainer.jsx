import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {SetKeyAndId, SetUserAuthData} from "../redux/profile-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        /*if(localStorage.getItem('token'))
        {
            axios.post('http://localhost:4000/checkToken', {}, {headers: {token: localStorage.getItem('token')}})
                .then(response => {
                    debugger
                    if(response.data.status !== "expired") {
                        console.log(response.data.timeLeft);
                    }
                })
        }*/
        /*const options = {
            headers: {
                email: 'd@gmail.com',
                password: 'd',
            }
        };
        axios.post('http://localhost:4000/auth/login', {}, options)
            .then(response => {
                if (response.data.accessToken != null) {
                    console.log(response.data);
                    let AuthData = {
                        email: options.headers.email,
                        password: options.headers.password,
                        id: response.data.userId,
                        isAuth: true
                    }
                    this.props.SetUserAuthData(AuthData);
                }
            })*/
    }

    render() {
        return <Header {...this.props}/>
    }
};
let mapStateToProps = (state) => {
    return {
        isAuth: state.ProfilePage.isAuth,
        name: localStorage.getItem('email'),
        id: localStorage.getItem('id')
    }
};
export default connect(mapStateToProps, {
})(HeaderContainer);
