import React from 'react';
import './Login.css';
import 'semantic-ui-css/semantic.min.css';
import PokerImage from '../images/poker.jpg';

function Login(props) {
    return (
        <div id="login">
            <div id="loginInput">
                <div  class="ui input focus"><input id="userName" type="text" placeholder="Enter user name ..."/></div>
                <button id="loginBtn" class="ui primary button">Login</button><br/>
                <div class="ui divider"></div>
                <div class="ui centered large image">
                    <img src={PokerImage} alt="Triple Ace"/>
                </div>
            </div>
        </div>
    );
}
export default Login;