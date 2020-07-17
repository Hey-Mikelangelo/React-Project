import React from "react";
import "./App.css";
import "./components/css/styles.css";
import Navbar from "./components/navbar/Navbar";
import {Route} from "react-router-dom";
import Settings from "./components/settings/Settings";
import News from "./components/News/News";
import Home from "./components/home/Home";
import ProfileContainer from "./components/profile/ProfileContainer";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from "./components/authorization/login/Login";
import Logout from "./components/authorization/logout/Logout";


const App = (props) => {
    return (
        <div>
            <HeaderContainer/>
            <section id="main_section">
                <div id="menu_and_content">
                    <Navbar/>
                    <div id="content">
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/users'
                               render={() => <UsersContainer/>}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/news' component={News}/>
                        <Route path='/home' component={Home}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/logout' component={Logout}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
