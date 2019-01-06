import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Input} from 'semantic-ui-react';
import './PokerRoom.css';

class LeftChat extends Component {

    constructor(props) {
        super(props);
        this.sendChatText = this.sendChatText.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    sendChatText(event) {
        let chatText = this.msgInput.inputRef.value;
        if (chatText.length <= 0) {
            this.props.updateErrorMsg("Empty message.");
        } else {
            this.context.sendChatText(chatText);
            this.msgInput.inputRef.value = "";
        }
    }

    enterClicked(event) {
        if (event.keyCode === 13) {
            this.sendChatText(event);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.chatDiv.scrollTop = this.chatDiv.scrollHeight;
    }

    render() {
        let messages = this.props.messages;
        return (
            <div id="leftChat">
                <div id="chatPaneArea" className="ui comments" ref={(chatDiv) => this.chatDiv = chatDiv}>
                        <div className="comment">
                            <div className="content">
                                <label className="author">System</label>
                                <div className="text">We can chat.</div>
                            </div>
                        </div>

                        {messages.map((message, index) => 
                            <div className="comment" key={index}>
                                <div className="content">
                                    <label className="author">{message.userName}</label>
                                    <div className="text">{message.chatMessage}</div>
                                </div>
                            </div>)
                        }
                </div>

                <Input action={{
                            className: "ui button",
                            content: "Send",
                            onClick: this.sendChatText
                        }}
                        fluid
                        placeholder='Enter message'
                        onKeyUp={this.enterClicked}
                        ref={(input) => this.msgInput = input} />
            </div>
        );
    }

}

LeftChat.contextTypes = {
    sendChatText: PropTypes.func
}

export default LeftChat;