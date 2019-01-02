import React, { Component } from 'react';
import LeftChat from './left-chat';
import FibonacciBtns from './fibonacci-btns';
import Statistics from './statistics';
import './index.css';

class PokerRoom extends Component {

    render() {
        return (
            <div id="poker_room">
                <LeftChat {...this.props}/>
                <div id="midDivider"/>
                <div id="rightPoker">
                    <FibonacciBtns {...this.props}/>
                    <Statistics {...this.props}/>
                </div>
            </div>
        );
    }
}

export default PokerRoom;