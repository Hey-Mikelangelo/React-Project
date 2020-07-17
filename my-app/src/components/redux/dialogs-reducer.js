let UPDATE_DIALOG_TEXT = "UPDATE-DIALOG-TEXT";
let ADD_MESSAGE = "ADD-MESSAGE";

export const updateDialogTextAC = (text) => {
    return {type: UPDATE_DIALOG_TEXT, text: text}
}
export const addMessageAC = () => {
    return {type: ADD_MESSAGE}
}

let initialState = {
    MessageData: [
        {id: 1, sender: "Katty", text: "Hhhhhi"},
        {id: 2, sender: "John", text: "HHello"},
        {id: 3, sender: "John", text: "How are you?"},
        {id: 4, sender: "John", text: "Maybe meet?"},
        {id: 5, sender: "Katty", text: "Oh... Ok. Next Monday?"},
        {id: 6, sender: "John", text: "Fine, see you"},
    ],
    DialogsData: [
        {id: 1, name: "Kek LOL"},
        {id: 2, name: "Thanos"},
        {id: 3, name: "Kat"},
        {id: 4, name: "Lembreasr"},
        {id: 5, name: "Geo"},
    ],
    GeneralData: {
        name: "John",
        currentText: ""
    }
}

const dialogsReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case UPDATE_DIALOG_TEXT:
                       return {
                ...state,
                GeneralData: {...state.GeneralData, currentText: action.text}
            }

        case ADD_MESSAGE:
            let index = state.MessageData.length + 1;
            let newMessage = {
                id: index,
                sender: state.GeneralData.name,
                text: state.GeneralData.currentText
            }
            let newState = {...state};
            newState.MessageData = [...state.MessageData, newMessage]
            newState.GeneralData.currentText = "";
            return newState;
        default:
            return state;
    }

}
export default dialogsReducer;