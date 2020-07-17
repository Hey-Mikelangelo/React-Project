import {dbApi} from "../API/Api";

let FOLLOW = "FOLLOW";
let UNFOLLOW = "UNFOLLOW";
let LOAD_USERS = "LOAD-USERS";
let SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
let SET_TOTAL_USERS_COUNT = "SET-TOTAL-UERS-COUNT";
let TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
let TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

export const SetFollow = (id) => {
    return {type: FOLLOW, id}
}
export const SetUnfollow = (id) => {
    return {type: UNFOLLOW, id}
}
export const LoadUsers = (users) => {
    return {type: LOAD_USERS, users: users}
}
export const SetCurrentPage = (page) => {
    return {type: SET_CURRENT_PAGE, currentPage: page}
}
export const SetTotalUsersCount = (count) => {
    return {type: SET_TOTAL_USERS_COUNT, count}
}
export const ToggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching};
}
export const ToggleFollowingProgress = (inProgress, id) => {
    return {type: TOGGLE_FOLLOWING_PROGRESS, inProgress, id};
}

export const Follow = (id) => {
    return (dispatch) => {
        dbApi.follow(id).then(() => {
                dispatch(SetFollow(id));
                dispatch(ToggleFollowingProgress(false, id));
            }
        )
    }
}
export const Unfollow = (id) => {
    return (dispatch) => {
        dbApi.unfollow(id).then(() => {
                dispatch(SetUnfollow(id));
                dispatch(ToggleFollowingProgress(false, id));
            }
        )
    }
}
let InitialState = {
    users: [],
    pageSize: 5,
    pageCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: []
}

const usersReducer = (state = InitialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            let stateCopy = {...state};
            stateCopy.users = [...state.users];
            stateCopy.users = stateCopy.users.map(
                (u) => {
                    if (u._id === action.id) {
                        u.followed = true;
                        return {...u};
                    }
                    return u;
                }
            )

            return stateCopy;
        }
        case UNFOLLOW: {
            let stateCopy = {...state};
            stateCopy.users = [...state.users];
            stateCopy.users = stateCopy.users.map(
                (u) => {
                    if (u._id === action.id) {
                        u.followed = false;
                        return {...u};
                    }
                    return u;
                }
            )
            return stateCopy;
        }
        case LOAD_USERS:
            let newState = {...state};
            newState.users = [...action.users];
            return newState;
        case SET_CURRENT_PAGE:
            debugger
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return {...state, pageCount: action.count};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgres: action.inProgress
                    ? [...state.followingInProgres, action.id]
                    : state.followingInProgres.filter(id => id != action.id)
                }
        default:
            return state;
    }

}
export default usersReducer;

