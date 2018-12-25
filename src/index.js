import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Login from './components/Login'
import CreateRoom from './components/CreateRoom'
import PokerRoom from './components/PokerRoom'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// It's relative path to site's deployment root. e.g. zhk.me/abc/ ==> "/abc"; zhk.me ==> "".
let deployPath = "";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path={`${deployPath}/`} component={Login}/>
            <Route exact path={`${deployPath}/create-room`} component={CreateRoom}/>
            <Route exact path={`${deployPath}/poker-room`} component={PokerRoom}/>
        </Switch>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
