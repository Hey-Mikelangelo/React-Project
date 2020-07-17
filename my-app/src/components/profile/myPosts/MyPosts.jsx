import React from "react";
import s from "./MyPosts.module.css";
import Posts from "./post/Posts";

const MyPosts = (props) => {
    let OnAddPost = () => {
        props.AddPost();
    }

    let OnChangePostText = (e) => {
        let text = e.target.value
        props.ChangePostText(text);
    }

    return (
        <div>
            <div>MyPosts</div>
            <textarea value={props.currentText} onChange={OnChangePostText}></textarea>
            <button onClick={OnAddPost}>Add post</button>
            <div className={s.posts}>
                <Posts postsData={props.postsData}/>
            </div>
        </div>
    );
};

export default MyPosts;
