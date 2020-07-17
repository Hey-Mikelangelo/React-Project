import React from "react"
import s from "../messages/Messages.module.css";

const Messages = (props) => {

    let MessagesElements = Object.keys(props.messageData).map(
        (index) => (
            <Message key={props.messageData[index].id} text={props.messageData[index].text}
                     sender={props.messageData[index].sender} myName={props.myName}/>
        )
    )
    return (
        <div className={s.messages}>
            {MessagesElements}
        </div>
    )
}

const Message = (props) => {
    let who = (props.sender === props.myName) ? `${s.me}` : `${s.other}`;
    return <div className={`${s.message} ${who}`}>{props.text}</div>
}
export default Messages;