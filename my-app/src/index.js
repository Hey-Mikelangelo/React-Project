import * as serviceWorker from './serviceWorker';
// import {Subscribe} from "./components/redux/State";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Store from "./components/redux/redux-store";
import { Provider } from "react-redux";
import { loadUsersAC } from "./components/redux/users-reducer";


ReactDOM.render( <
    BrowserRouter >
    <
    Provider store = { Store } >
    <
    App / >
    <
    /Provider> <
    /BrowserRouter>, document.getElementById('root'));

window.store = Store;

serviceWorker.unregister();