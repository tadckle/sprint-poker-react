import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './index.css';
import DoneImage from '../../images/done.jpg';

const UNKNOW_FIBONICA = -99;
let isAllDone = false;
let averagePoint = "XXX";
let statistics = []

class Statistics extends Component {

    // Initialize some internal states.
    componentWillUpdate(nextProps, nextState) {
        let players = nextProps.players;
        isAllDone = players.filter(player => player.fibonacciNum === -1).length <= 0;
        averagePoint = this.countAveragePoiont(players, isAllDone);
        statistics = this.generateStatistics(players, isAllDone);
    }

    countAveragePoiont(players, isAllDone) {
        if (!isAllDone) {
            return "XXX";
        }
        let clearVotePlayers = players.filter(player => player.fibonacciNum !== UNKNOW_FIBONICA);
        if (clearVotePlayers.length <= 0) {
            return UNKNOW_FIBONICA;
        }
        let sum = clearVotePlayers.map(player => player.fibonacciNum)
                .reduce((num1, num2) => num1 + num2)
        let average = sum / clearVotePlayers.length;
        return Math.floor(average * 10) / 10;
    }

    generateStatistics(players, isAllDone) {
        if (!isAllDone) {
            return [];
        }
        let playerGroup = [];
        players.forEach(player => {
            let playerItem = playerGroup.find(item => item.fibonacciNum === player.fibonacciNum);
            if (playerItem === undefined) {
                playerGroup.push({fibonacciNum: player.fibonacciNum, players: [player]});
            } else {
                playerItem.players.push(player);
            }
        })
        
        let fibonacciCount = [];
        playerGroup.forEach(group => {
            fibonacciCount.push({fibonacciNum: group.fibonacciNum, count: group.players.length})
        })
        fibonacciCount.sort((count1, count2) => count2.count - count1.count);
        return fibonacciCount;
    }

    getFibonacciVal(number, isAllDone) {
        if (isAllDone) {
            return number === UNKNOW_FIBONICA ? "No idea" : number;
        } else {
            return number === -1 ? "XXX" : <img src={DoneImage} width="60" alt="Done"/>;
        }
    }

    clearVote(event) {
        this.context.sendMessage(this.context.cmdTypes.CLEAR);
    }

    createPlayerResultTable() {
        return (<table id="resultTable" className="ui celled table"><tbody>
                    {this.props.players.map((player, index) => 
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{this.getFibonacciVal(player.fibonacciNum, isAllDone)}</td>
                        </tr>)}
                </tbody></table>);
    }

    createStatisticsElement() {
        return (<table id="statisticsTable" className="ui single line table">
                    <thead><tr>
                        <th>Story Point</th>
                        <th>Vote</th>    
                    </tr></thead>
                    <tbody>
                        {statistics.map((item, index) => <tr key={index}>
                            <td>{item.fibonacciNum === UNKNOW_FIBONICA ? "No idea" : item.fibonacciNum}</td>
                            <td>{item.count}</td>
                        </tr>)}
                    </tbody>
                </table>);
    }
    
    render() {
        return (
            <div>
                {isAllDone ? this.createStatisticsElement() : null}
                <div id="avgDiv">
                    <div id="avgHeadDiv">
                        <h3 id="avgPoint" className="ui header">Average points: {averagePoint === UNKNOW_FIBONICA ? "No idea" : averagePoint}</h3>
                    </div>
                    {this.props.isHost ? <div id="clear"><button className="ui primary button" onClick={this.clearVote.bind(this)}>Clear</button></div> : null}
                    <br/><br/>
                    <div id="statisticsMargin">
                        {this.createPlayerResultTable()}
                    </div>
                </div>
            </div>
        );
    }
}

Statistics.contextTypes = {
    cmdTypes: PropTypes.object,
    sendMessage: PropTypes.func
}

export default Statistics;