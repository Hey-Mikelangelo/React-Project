import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        currentText: state.ProfilePage.CurrentText,
        postsData: state.ProfilePage.PostsData
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        ChangePostText: (text) => {
            dispatch(updateNewPostTextAC(text));
        },
        AddPost: () => {
            dispatch(addPostAC())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
