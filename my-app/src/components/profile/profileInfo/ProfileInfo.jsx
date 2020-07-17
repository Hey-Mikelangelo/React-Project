import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
    const profileImgStyle = {
        backgroundImage: 'url(' + props.profileImg + ')'
    }

    return (
        <div id={s.profile_info}>
            <div id={s.profile_img_cont}>
                <div id={s.profile_img}>
                    <img style={profileImgStyle} alt=""/>
                </div>
            </div>
            <div id={s.info_col}>
                <div id={s.info}>
                    <h3 id={s.name}>{props.name}</h3>
                    <ul id={s.additional_info}>
                        <li>Age: {props.age}</li>
                        <li>About: {props.about}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
