import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {store} from './actions/Reducer';
import AppView from './components/app/Controller';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <AppView/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
