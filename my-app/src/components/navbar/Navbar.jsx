import React from "react";
// import component from './../css/Navbar.module.css';
import s from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = (props) => {
    let profilePath = `/profile/${props.userId}`
    return (
        <div id={s.side_menu}>
            <div>
                <ul>
                    <li id={s.main_page_list_item}>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={profilePath}>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dialogs">Messages</NavLink>
                    </li>
                    <li>
                        <NavLink to="/news">News</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Users</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/settings">Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Exit</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return{
        userId: localStorage.getItem('id')
    }
}
export default connect(mapStateToProps, {})(Navbar);
