import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export const updateDialogText = "UPDATE-DIALOG-TEXT";
export const addMessage = "ADD-MESSAGE";
let Store = {
    _State: {
        ProfilePage: {
            PostsData: {
                1: {text: "it's my first post", likes: "5"},
                2: {text: "Hello world", likes: "300"},
                3: {text: "it's my first post", likes: "58"},
                4: {text: "Hello world", likes: "97"},
                5: {text: "I love react", likes: "0"},
                6: {text: "Lala land", likes: "1000000"}
            },
            CurrentText: "",
            ProfileData: {
                backgroundImg: "https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/720/1x/cbeebies/waffle-doggy-music-vid-3.jpg",
                profileImg: "https://missemilysbedandbiscuit.com/images/dog7.jpg"
            }
        },
        DialogsPage: {
            MessageData: {
                1: {id: 1, sender: "Katty", text: "Hhhhhi"},
                2: {id: 2, sender: "John", text: "HHello"},
                3: {id: 3, sender: "John", text: "How are you?"},
                4: {id: 4, sender: "John", text: "Maybe meet?"},
                5: {id: 5, sender: "Katty", text: "Oh... Ok. Next Monday?"},
                6: {id: 6, sender: "John", text: "Fine, see you"},

            },
            DialogsData: {
                1: {id: 1, name: "Rafik Zhirafik"},
                2: {id: 2, name: "Vanya"},
                3: {id: 3, name: "Katia"},
                4: {id: 4, name: "Lembreasr"},
                5: {id: 5, name: "Geo"},
            },
            GeneralData: {
                name: "John",
                currentText: ""
            }
        },
        Sidebar: {}
    },
    _CallSubscriber() {
    },
    AddPost(text) {
        let newPost = {
            text: text,
            likes: 0
        }
        let index = Object.keys(this._State.ProfilePage.PostsData).length;
        this._State.ProfilePage.PostsData[index + 1] = newPost;
        Store._CallSubscriber();
    },
    UpdatePostText(newText) {
        this._State.ProfilePage.CurrentText += newText;
    },
    GetState() {
        return this._State;
    },
    Subscribe(observer) {
        this._CallSubscriber = observer;
    },

    dispatch(action) {
        this._State.ProfilePage = profileReducer(this._State.ProfilePage, action);
        this._State.DialogsPage = dialogsReducer(this._State.DialogsPage, action);
        this._State.Sidebar = sidebarReducer(this._State.Sidebar, action);
        Store._CallSubscriber(this._State);


    }

}


export default Store;