import React from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import Preloader from "../common/preloader/Preloader";


const Profile = (props) => {
    const backImgStyle = {
        backgroundImage: 'url(' + props.backgroundImg + ')'
    }
    if (!props.backgroundImg) {
        return <Preloader/>
    }
    return (
        <div id={s.content}>
            <div>
                <div id={s.profile_back_img}>
                    <div>
                        <img id={s.profile_background} style={backImgStyle} alt=""/>
                    </div>

                </div>

                <ProfileInfo profileImg={props.profileImg}
                             name={props.name}
                             followed={props.followed}
                             age={props.age}
                             about={props.about}/>

                <div id={s.profile_content}>
                    <div id={s.content_col}>
                        <div id={s.my_posts}>

                            <MyPostsContainer/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
