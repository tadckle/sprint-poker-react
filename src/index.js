import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Login from './components/Login'
import CreateRoom from './components/CreateRoom'
import PokerRoom from './components/PokerRoom'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { addName, PokerApp } from './actions/controller';

// It's relative path to site's deployment root. e.g. zhk.me/abc/ ==> "/abc"; zhk.me ==> "".
let deployPath = "";

const socket = new WebSocket("ws://127.0.0.1:8080/SprintPoker/poker");

socket.onopen = function(event) {
    console.log("Client WebSocekt is opened.");
}

socket.onclose = function(event) {
    alert("Cannot establish connection with server.");
    socket.close();
    window.location.reload();
}

let initialState = {
    name: "unknown",
    roomId: "-1",
    isHost: false,
    fibonacciNum: -1
};

let store = createStore(PokerApp, initialState);

store.subscribe(() => {
    console.log(store.getState().name)
});

function mapLoginProps(state) {
    return {
        name: state.name
    };
}

function mapLoginDispatch(dispatch) {
    return {
        onNameChange: function(newName) {
            dispatch(addName(newName))
        }
    }
}

const LoginController = connect(mapLoginProps, mapLoginDispatch)(Login);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path={`${deployPath}/`} component={LoginController}/>
                <Route exact path={`${deployPath}/create-room`} component={CreateRoom}/>
                <Route exact path={`${deployPath}/poker-room`} component={PokerRoom}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
