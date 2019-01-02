import {store, changePage, pages, updateRooms, setRoomId, addMessage,
     updatePlayers, updateHasVoted, setIsHost, updateErrorMsg} from './Reducer';

const cmdTypes = {
    GET_ALL_ROOMS: 0,
    CREATE_ROOM: 1,
    LOGIN: 2,
    ERROR: 3,
    SEND_MSG: 4,
    CREATE_ROOM_DONE: 5,
    JOIN_ROOM: 6,
    JOIN_ROOM_DONE: 7,
    ALL_USER: 8,
    UPDATE_FIBONACI: 9,
    CLEAR: 10,
    UPDATE_ROOMS: 11,
    CHAT: 12,
    RETURN_ROOM_DASHBOARD: 13,
    SET_AS_HOST: 14,
    SHOW_LOGIN: 100
}

const socket = new WebSocket("ws://127.0.0.1:8080/SprintPoker/poker");

socket.onopen = function(event) {
    console.log("Client WebSocekt is opened.");
}

socket.onclose = function(event) {
    alert("Cannot establish connection with server.");
    socket.close();
    window.location.reload();
}

// Send message to server.
function sendMessage(cmdType) {
    let state = store.getState();
    let user = {name: state.name, isHost: state.isHost, fibonacciNum: state.fibonacciNum};
    let command = {type: cmdType, roomNum: state.roomId, player: user};
    socket.send(JSON.stringify(command));
}

function sendChatText(message) {
    let state = store.getState();
    let user = {name: state.name, isHost: state.isHost, fibonacciNum: state.fibonacciNum};
    let command = {type: cmdTypes.CHAT, player: user, chatMsg: message};
    socket.send(JSON.stringify(command));
}

socket.onmessage = event => {
    var returnMsg = JSON.parse(event.data);
    if (returnMsg.actionType === cmdTypes.SHOW_LOGIN) {
        showDashBoard();
    } else if (returnMsg.actionType === cmdTypes.UPDATE_ROOMS) {
        updateAvailableRooms(returnMsg.rooms);
    } else  if (returnMsg.actionType === cmdTypes.CREATE_ROOM_DONE) {
        showRoom(returnMsg.roomId);
    } else if (returnMsg.actionType === cmdTypes.JOIN_ROOM_DONE) {
        showRoom(returnMsg.message);
    } else if (returnMsg.actionType === cmdTypes.CHAT) {
        updateChatMsg(returnMsg.name, returnMsg.chatMessage);
    } else if (returnMsg.actionType === cmdTypes.ALL_USER) {
        updatePokerData(returnMsg.players);
    } else if (returnMsg.actionType === cmdTypes.CLEAR) {
        store.dispatch(updateHasVoted(false));
    } else if (returnMsg.actionType === cmdTypes.SET_AS_HOST) {
        store.dispatch(setIsHost(true));
    } else if (returnMsg.actionType === cmdTypes.ERROR) {
        store.dispatch(updateErrorMsg(returnMsg.message));
    }
};

function showDashBoard() {
    store.dispatch(changePage(pages.CREATE_ROOM));
}

function updateAvailableRooms(rooms) {
    store.dispatch(updateRooms(rooms));
}

function showRoom(roomId) {
    store.dispatch(setRoomId(roomId));
    store.dispatch(changePage(pages.POKER_ROOM));
}

function updateChatMsg(userName, chatMessage) {
    store.dispatch(addMessage({userName, chatMessage}))
}

function updatePokerData(newPlayers) {
    store.dispatch(updatePlayers(newPlayers))
}

export { cmdTypes, sendMessage, sendChatText };