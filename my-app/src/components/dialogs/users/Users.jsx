import React from "react"
import s from "../users/Users.module.css"
import {NavLink} from "react-router-dom";

const Users = (props) => {
    let DialogsElements = props.dialogsData.map(
        (user) => <User id={user.id} name={user.name} key={user.id}/>
    );

    return (
        <div className={s.contacts}>
            {DialogsElements}
        </div>
    );
}

const User = (props) => {
    return (
        <div className={s.user}>
            <img alt=""/>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
}
export default Users;