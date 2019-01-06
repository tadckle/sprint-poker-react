import React, { Component } from 'react';
import LeftChat from './LeftChat';
import FibonacciBtns from './FibonacciBtns';
import Statistics from './Statistics';
import './PokerRoom.css';

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