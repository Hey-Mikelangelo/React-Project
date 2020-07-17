import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header id={s.header}>
            <div>
                <div id={s.logo}>
                    <img alt=""/>
                </div>
                <div className={s.login}>
                    {props.isAuth
                        ? <NavLink to={`/logout`}> logout </NavLink>
                        : <NavLink to={"/login"}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
