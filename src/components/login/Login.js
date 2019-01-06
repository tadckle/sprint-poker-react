import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import PokerImage from '../../images/poker.jpg';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    handleNameChange(event) {
        this.props.setName(event.target.value);
    }

    handleLogin(event) {
        this.context.sendMessage(this.context.cmdTypes.LOGIN);
    }

    enterClicked(event) {
        if (event.keyCode === 13) {
            this.handleLogin(event);
        }
    }

    render() {
        return (
            <div id="login">
                <div id="loginInput">
                    <div  className="ui input focus">
                        <input type="text" value={this.props.name} onChange={this.handleNameChange} onKeyUp={this.enterClicked} placeholder="Enter user name ..."/>
                    </div>
                    <button className="ui primary button" onClick={this.handleLogin}>Login</button><br/>
                    <div className="ui divider"></div>
                    <div className="ui centered large image">
                        <img src={PokerImage} alt="Triple Ace"/>
                    </div>
                </div>
            </div>
        );
    }

}

Login.contextTypes = {
    cmdTypes: PropTypes.object,
    sendMessage: PropTypes.func
}

export default Login;