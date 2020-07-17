import React from "react";
import {connect} from "react-redux";
import {
    Follow,
    LoadUsers,
    SetCurrentPage,
    SetTotalUsersCount,
    ToggleFollowingProgress,
    ToggleIsFetching,
    Unfollow
} from "../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {dbApi} from "../API/Api";

class UserAPIComponent extends React.Component {
    following = [];
    UsersElements = [];
    Users = [];
    isFollowed = (id) => this.following.indexOf(id) !== -1 ? true : false;

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.props.ToggleIsFetching(true)
            dbApi.getUsers(this.props.currentPage, this.props.pageSize)
                .then(data => {
                    this.Users = data.Users;
                    let xTotalCount = data.usersCount;
                    this.props.SetTotalUsersCount((xTotalCount));
                    dbApi.getFollowing()
                        .then(
                            data => {
                                this.following = data;
                                this.UsersElements = this.Users.map(
                                    (user) => {
                                        if (!user) {
                                            return
                                        } else {
                                            let userCopy = {...user}
                                            userCopy.followed = this.isFollowed(user._id);
                                            userCopy.follow = this.props.Follow;
                                            userCopy.unfollow = this.props.Unfollow;
                                            userCopy.key = user._id;
                                            userCopy.ToggleFollowingProgress = this.props.ToggleFollowingProgress;

                                            return userCopy;
                                        }
                                    }
                                );
                                if (this.UsersElements.length > 0) {
                                    this.props.LoadUsers(this.UsersElements);
                                    this.props.ToggleIsFetching(false)
                                    // return UsersElements;
                                } else {
                                    this.props.ToggleIsFetching(false)
                                    // return <>no users</>
                                }
                            }
                        )
                })
        }
    }

    onPageChanged = (page) => {
        if (localStorage.getItem('token') !== null) {
            this.props.SetCurrentPage(page);
            this.props.ToggleIsFetching(true);
            dbApi.getUsers(page, this.props.pageSize)
                .then(data => {
                    this.Users = data.Users;
                    let xTotalCount = data.usersCount;
                    this.props.SetTotalUsersCount((xTotalCount));
                    dbApi.getFollowing().then(
                        data => {
                            this.following = data;
                            this.UsersElements = this.Users.map(
                                (user) => {
                                    if (!user) {
                                        return
                                    } else {
                                        let userCopy = {...user}
                                        userCopy.followed = this.isFollowed(user._id);
                                        userCopy.follow = this.props.Follow;
                                        userCopy.unfollow = this.props.Unfollow;
                                        userCopy.key = user._id;
                                        userCopy.ToggleFollowingProgress = this.props.ToggleFollowingProgress;
                                        userCopy.followingInProgress = this.props.followingInProgress;

                                        return userCopy;
                                    }
                                }
                            );
                            if (this.UsersElements.length > 0) {
                                this.props.LoadUsers(this.UsersElements);
                                this.props.ToggleIsFetching(false)
                                // return UsersElements;
                            } else {
                                this.props.ToggleIsFetching(false)
                                // return <>no users</>
                            }
                        }
                    )
                })
        }
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                pageCount={this.props.pageCount}
                pageSize={this.props.pageSize}
                ToggleIsFetching={this.props.ToggleIsFetching}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
            />
        </>

    }
}

let mapStateToProps = (state) => {

    return {
        users: state.UsersPage.users,
        // myId: state.ProfileData.id,
        pageSize: state.UsersPage.pageSize,
        pageCount: state.UsersPage.pageCount,
        currentPage: state.UsersPage.currentPage,
        isFetching: state.UsersPage.isFetching,
        token: localStorage.getItem('token'),
        followingInProgress: state.UsersPage.followingInProgres,
    }
}

const UsersContainer = connect(mapStateToProps,
    {
        Follow,
        Unfollow,
        LoadUsers,
        SetCurrentPage,
        SetTotalUsersCount,
        ToggleIsFetching,
        ToggleFollowingProgress
    }
)(UserAPIComponent);

export default UsersContainer;