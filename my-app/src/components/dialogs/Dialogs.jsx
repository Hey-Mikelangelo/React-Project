import React from "react";
import s from "./Dialogs.module.css";
import Messages from "./messages/Messages";
import Users from "./users/Users";

const Dialogs = (props) => {

    let OnSendMessage = () => {
        props.SendMessage();
    }
    const OnChangeMessageText = (e) => {
        props.ChangeMessageText(e.target.value);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.contacts_wrapper}>

                <Users dialogsData={props.dialogsData}/>

            </div>
            <div className={s.message_wrapper}>

                <Messages messageData={props.messageData}
                          myName={props.myName}/>

                <textarea
                    onChange={OnChangeMessageText}
                    value={props.currentText}>
                </textarea>
                <button onClick={OnSendMessage}>Send</button>
            </div>
        </div>
    )
}
export default Dialogs;