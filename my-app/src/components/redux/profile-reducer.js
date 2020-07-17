let UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
let ADD_POST = "ADD-POST";
let SET_USER_PROFILE = "SET-USER-PROFILE";
// let SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA ";
// let SET_TOKEN_AND_ID = "SET_TOKEN_AND_ID";
let LOG_IN_OUT = "LOG_IN_OUT";
export const updateNewPostTextAC = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, text: text}
}
export const addPostAC = (text) => {
    return {type: ADD_POST, text: text}
}
export const SetUserProfile = (profileData) => {
    return {type: SET_USER_PROFILE, profileData}
}
/*export const SetUserAuthData = (data) => {
    return {type: SET_USER_AUTH_DATA, email: data.email, password: data.password, id: data.id, isAuth: data.isAuth}
}*/
export const LogInOut = (i) => {
    return {type: LOG_IN_OUT, isAuth: i};
}

let initialState = {
    PostsData: [
        {id: 1, text: "it's my first post", likes: "5"},
        {id: 2, text: "Hello world", likes: "300"},
        {id: 3, text: "it's my first post", likes: "58"},
        {id: 4, text: "Hello world", likes: "97"},
        {id: 5, text: "I love react", likes: "0"},
        {id: 6, text: "Lala land", likes: "1000000"}
    ],
    isAuth: null,
    CurrentText: "",
    ProfileData: {
        name: "",
        profileImg: "",
        backgroundImg: "",
        followed: null,
        age: "",
        id: "",
        about: "",
        isActive: null,
    }
    /*UserData: {
        email: "",
        password: "",
        userId: "",
        isAuth: false
    }*/
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                CurrentText: action.text
            }
        case ADD_POST:
            let newPost = {
                text: state.CurrentText,
                likes: 0
            }

            let newState = {...state};
            newState.PostsData = [...state.PostsData, newPost];
            newState.CurrentText = "";
            return newState;
        case SET_USER_PROFILE:
            return {...state, ProfileData: action.profileData};
        case LOG_IN_OUT:
            return {...state, isAuth: action.isAuth};
        /*case SET_USER_AUTH_DATA:
            debugger
            let newStateA = {...state};
            newStateA.UserData = {
                ...state.UserData,
                email: action.email,
                password: action.password,
                userId: action.id,
                isAuth: action.isAuth
            };
            return newStateA;*/
        // case SET_TOKEN_AND_ID:
        //     return {...state, UserData: {...state.UserData, token: action.token, id: action.id}};
        default:
            let is = localStorage.getItem('isAuth')
            if(is === "false")
                return {...state, isAuth: false};
            else
                return {...state, isAuth: true};
    }
}
export default profileReducer;