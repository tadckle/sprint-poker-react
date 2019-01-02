import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './index.css';
import DoneImage from '../../images/done.jpg';
import { UNKNOW_FIBONICA } from '../../actions/Reducer';

let isAllDone = false;
let averagePoint = "XXX";
let statistics = []

class Statistics extends Component {

    // Initialize some internal states.
    componentWillUpdate(nextProps, nextState) {
        isAllDone = nextProps.isAllDone;
        averagePoint = nextProps.averagePoint;
        statistics = nextProps.statistics;
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