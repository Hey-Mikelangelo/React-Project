import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
let reducers = combineReducers(
    {
        ProfilePage: profileReducer,
        DialogsPage: dialogsReducer,
        Sidebar: sidebarReducer,
        UsersPage: usersReducer
    }
)

let Store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default Store;