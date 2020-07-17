import React from "react";
import s from "./Posts.module.css";

const Post = (props) => {
    return (
        <div id={s.post}>
            <div>
{/*                <img className={s.img} src="https://wifinowevents.s3.amazonaws.com/uploads/2016/07/BlackSilhouette.png"
                     alt="altImg"/>*/}
            </div>
            <div className={s.post_text}>
                {props.text}
            </div>
            <div>
                <button>Like</button>
                {props.likes} likes
            </div>
        </div>
    )
}
const Posts = (props) => {
    let PostsElements = props.postsData.map(
        (post) => (
            <Post key={post.id} text={post.text} likes={post.likes}/>
        )
    )
    return (
        <div>
            {PostsElements}
        </div>
    )
};

export default Posts;
