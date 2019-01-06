import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './PokerRoom.css';
import { pages, UNKNOW_FIBONICA } from '../../actions/Reducer';

class FibonacciBtns extends Component {

    constructor(props) {
        super(props);
        this.clicked = 1;
        this.exitRoom = this.exitRoom.bind(this);
        this.createButtons = this.createButtons.bind(this);
    }

    exitRoom(event) {
        this.props.setIsHost(false);
        this.props.setFibonacciNum(-1);
        this.props.clearMessage();
        this.props.updateHasVoted(false);
        this.context.sendMessage(this.context.cmdTypes.RETURN_ROOM_DASHBOARD);
        this.props.changePage(pages.CREATE_ROOM);
    }

    btnClick(numbStr) {
        if (this.props.hasVoted) {
            return;
        }
        this.props.updateHasVoted(true);
        let numb = "???" === numbStr ? UNKNOW_FIBONICA : parseInt(numbStr);
        this.props.setFibonacciNum(numb);
        this.context.sendMessage(this.context.cmdTypes.UPDATE_FIBONACI);
    }

    createButtons(numbers) {
        return (<div className="ui buttons">
                    {numbers.map((numb, index) => <button key={index} className="ui button" onClick={this.btnClick.bind(this, numb)}>{numb}</button>)};
                </div>);
    }

    render() {
        return (
            <div>
                <div id="rightTopDiv">
                    <div id="showRoomDiv"><h2 id="showRoomId" className="ui header">Room ID: {this.props.roomId}</h2></div>
                    <div id="exitRoom"><button className="ui positive button" onClick={this.exitRoom}>Exit</button></div>
                </div>

                <div className="ui divider"></div>
                {this.createButtons(["01", "02", "03", "05", "08"])}
                <div><br/></div>
                {this.createButtons(["13", "21", "34", "55", "???"])}
                <div className="ui divider"></div>
            </div>
        );
    }

}

FibonacciBtns.contextTypes = {
    cmdTypes: PropTypes.object,
    sendMessage: PropTypes.func
}

export default FibonacciBtns;