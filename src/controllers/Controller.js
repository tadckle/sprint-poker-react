import { changePage, setName, setIsHost, setRoomId, setSearchRoomId, 
    setFibonacciNum, clearMessage, updateHasVoted, setModalOpen, 
    updateErrorMsg, UNKNOW_FIBONICA } from '../actions/Reducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../App';
import Login from '../components/login';
import CreateRoom from '../components/create-room';
import PokerRoom from '../components/poker-room';

const AppView = connect(state => {
    return {
        page: state.page,
        errorMsg: state.errorMsg,
        modalOpen: state.modalOpen
    }
}, dispatch => {
    return {
        setModalOpen: bindActionCreators(setModalOpen, dispatch)
    }
})(App)


const LoginView = connect(state => {
    return {name: state.name}
}, dispatch => {
    return {setName: bindActionCreators(setName, dispatch)}
})(Login);


const CreateRoomView = connect(state => {
    return {
        name: state.name,
        rooms: state.rooms,
        searchRoomId: state.searchRoomId
    }
}, dispatch => {
    return {
        setIsHost: bindActionCreators(setIsHost, dispatch),
        setRoomId: bindActionCreators(setRoomId, dispatch),
        setSearchRoomId: bindActionCreators(setSearchRoomId, dispatch)
    }
})(CreateRoom);


function countAveragePoiont(players, isAllDone) {
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

function generateStatistics(players, isAllDone) {
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
    
    let statistics = [];
    playerGroup.forEach(group => {
        statistics.push({fibonacciNum: group.fibonacciNum, count: group.players.length})
    })
    statistics.sort((count1, count2) => count2.count - count1.count);
    return statistics;
}

const PokerRoomView = connect(state => {
    let isAllDone = state.players.filter(player => player.fibonacciNum === -1).length <= 0;
    return {
        roomId: state.roomId,
        messages: state.messages,
        players: state.players,
        isHost: state.isHost,
        hasVoted: state.hasVoted,
        isAllDone,
        averagePoint: countAveragePoiont(state.players, isAllDone),
        statistics: generateStatistics(state.players, isAllDone)
    };
}, dispatch => {
    return {
        setIsHost: bindActionCreators(setIsHost, dispatch),
        setFibonacciNum: bindActionCreators(setFibonacciNum, dispatch),
        changePage: bindActionCreators(changePage, dispatch),
        clearMessage: bindActionCreators(clearMessage, dispatch),
        updateHasVoted: bindActionCreators(updateHasVoted, dispatch),
        updateErrorMsg: bindActionCreators(updateErrorMsg, dispatch)
    };
})(PokerRoom);


export {AppView, LoginView, CreateRoomView, PokerRoomView};