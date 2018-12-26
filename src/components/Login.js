import React, { Component } from 'react';
import './Login.css';
import 'semantic-ui-css/semantic.min.css';
import PokerImage from '../images/poker.jpg';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div id="login">
                <div id="loginInput">
                    <div  className="ui input focus">
                        <input id="userName" type="text" value={this.props.name} onChange={this.handleNameChange} placeholder="Enter user name ..."/>
                    </div>
                    <button id="loginBtn" className="ui primary button">Login</button><br/>
                    <div className="ui divider"></div>
                    <div className="ui centered large image">
                        <img src={PokerImage} alt="Triple Ace"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;