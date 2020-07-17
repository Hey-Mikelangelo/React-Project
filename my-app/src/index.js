import * as serviceWorker from './serviceWorker';
// import {Subscribe} from "./components/redux/State";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Store from "./components/redux/redux-store";
import {Provider} from "react-redux";
import {loadUsersAC} from "./components/redux/users-reducer";

/*Store.dispatch(loadUsersAC(
    [
    {id: 0, photoUrl: "https://www.pennmedicine.org/-/media/mpd/providers/petrov_dmitriy.jpg",
        followed: true, name: "Abram Abramovich", location: {city: "Moscow", country: "Russia"}},
    {id: 1, photoUrl: "https://www.pennmedicine.org/-/media/mpd/providers/petrov_dmitriy.jpg",
        followed: false, name: "Ougmantas Stimacius", location: {city: "Vilnius", country: "Lithuania"}},
    {id: 2, photoUrl: "https://www.pennmedicine.org/-/media/mpd/providers/petrov_dmitriy.jpg",
        followed: true, name: "Vera Ivleeva", location: {city: "Moscow", country: "Russia"}}
]
))*/

ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <App/>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

window.store = Store;


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
