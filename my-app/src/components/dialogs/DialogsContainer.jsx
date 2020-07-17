import React from "react";
import {addMessageAC, updateDialogTextAC} from "../redux/dialogs-reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
    return {
        dialogsData: state.DialogsPage.DialogsData,
        messageData: state.DialogsPage.MessageData,
        currentText: state.DialogsPage.GeneralData.currentText,
        myName: state.DialogsPage.GeneralData.name,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        ChangeMessageText: (text) => {
            dispatch(updateDialogTextAC(text));
        },
        SendMessage: () => {
            dispatch(addMessageAC());
        }
    }
}

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;