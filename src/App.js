import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import {pages} from './actions/Reducer';
import {LoginView, CreateRoomView, PokerRoomView} from './controllers/Controller';
import { cmdTypes, sendMessage, sendChatText } from './actions/SocketHandler';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class App extends Component {

    getMainView() {
        switch(this.props.page) {
            case pages.LOGIN:
                return (<LoginView/>);
            case pages.CREATE_ROOM:
                return (<CreateRoomView/>);
            case pages.POKER_ROOM:
                return (<PokerRoomView/>);
            default:
                return (<LoginView/>);
        }
    }

    handleClose = () => this.props.setModalOpen(false);

    getModalView() {
        return (
            <Modal
                open={this.props.modalOpen && this.props.errorMsg.length > 0}
                onClose={this.handleClose}
                basic
                size='small'>

                <Header icon='warning sign' content='Warning' />
                <Modal.Content>
                    <h3>{this.props.errorMsg}</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                </Modal.Actions>
            </Modal>);
    }

    render() {
        return (
            <div>
                {this.getMainView()}
                {this.getModalView()}
            </div>
        );
    }

    getChildContext() {
        return {
            cmdTypes, 
            sendMessage, 
            sendChatText
        };
    }

}

App.childContextTypes = {
    cmdTypes: PropTypes.object,
    sendMessage: PropTypes.func,
    sendChatText: PropTypes.func
}

export default App;