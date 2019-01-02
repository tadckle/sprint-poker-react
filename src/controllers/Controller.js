import { changePage, setName, setIsHost, setRoomId, setSearchRoomId, 
    setFibonacciNum, clearMessage, updateHasVoted, setModalOpen } from '../actions/Reducer';
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


const PokerRoomView = connect(state => {
    return {
        roomId: state.roomId,
        messages: state.messages,
        players: state.players,
        isHost: state.isHost,
        hasVoted: state.hasVoted
    };
}, dispatch => {
    return {
        setIsHost: bindActionCreators(setIsHost, dispatch),
        setFibonacciNum: bindActionCreators(setFibonacciNum, dispatch),
        changePage: bindActionCreators(changePage, dispatch),
        clearMessage: bindActionCreators(clearMessage, dispatch),
        updateHasVoted: bindActionCreators(updateHasVoted, dispatch)
    };
})(PokerRoom);


export {AppView, LoginView, CreateRoomView, PokerRoomView};