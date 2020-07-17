import React from "react";
import s from "./Users.module.css"
import {NavLink} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";

let User = (props) => {
    let OnFollowClick = () => {
        props.follow(props._id)
        props.ToggleFollowingProgress(true, props._id);
    }
    let OnUnfollowClick = () => {
        props.unfollow(props._id)
        props.ToggleFollowingProgress(true, props._id);
    }
    let imgUrlStyle = {
        backgroundImage: 'url(' + props.profileImg + ')'
    }
    return (
        <div className={s.user}>
            <div className={s.photoAndButton}>
                <NavLink to={"/profile/" + props._id}>
                    <img style={imgUrlStyle} alt=""/>
                </NavLink>
                {props.followed
                    ? <button className={s.button} onClick={OnUnfollowClick} disabled={props.followingInProgress.some(id => id === props._id)}>
                        Unfollow</button>
                    : <button className={s.button} onClick={OnFollowClick} disabled={props.followingInProgress.some(id => id === props._id)}>Follow</button>
                }
            </div>
            <NavLink className={s.name} to={"/users/" + props._id}>{props.name}</NavLink>
            <div className={s.location}>
                <div>{props.city}</div>
                <div>{props.country}</div>
            </div>
        </div>
    )
}

const UsersElementsComponent = (props) => {
    let UsersElements = props.users.map(
        (user) => {
            if (!user) {
                return
            } else {
                return <User {...user} followingInProgress={props.followingInProgress}/>
            }
        }
    );
    return <>
        {props.isFetching ? <Preloader/> : null}
        {UsersElements}
    </>

}

const Users = (props) => {
    let pagesCount = Math.ceil(props.pageCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={s.users_content}>
            <div className={s.pages}>
                {pages.map(
                    (page) => {
                        return <span key={page} className={props.currentPage === page ? s.selectedPage : undefined}
                                     onClick={
                                         () => props.onPageChanged(page)
                                     }>
                            {page}
                        </span>
                    }
                )}
            </div>
            <UsersElementsComponent users={props.users} followingInProgress={props.followingInProgress}/>
        </div>
    )
}
export default Users;