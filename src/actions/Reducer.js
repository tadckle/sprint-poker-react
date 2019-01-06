import { createStore } from 'redux';

const UNKNOW_FIBONICA = -99;

const pages = {
    LOGIN: "__login_page",
    CREATE_ROOM: "__create_room_page",
    POKER_ROOM: "__poker_room_page"
}

const actionTypes = {
    CHANGE_PAGE: "__change_page",
    SET_NAME: "__set_name",
    SET_IS_HOST: "__set_is_host",
    SET_ROOM_ID: "__set_room_id",
    SET_FIBONACCI_NUM: "__set_fibonacci_num",
    UPDATE_ROOMS: "__update_rooms",
    ADD_MESSAGE: "__add_message",
    CLEAR_MESSAGE: "__clear_message",
    UPDATE_PLAYERS: "__update_players",
    UPDATE_HAS_VOTED: "__update_has_voted",
    UPDATE_ERROR_MSG: "__update_error_message",
    SET_MODAL_OPEN: false
}

function setName(newName) {
    return {type: actionTypes.SET_NAME, newName};
}

function setIsHost(isHost) {
    return {type: actionTypes.SET_IS_HOST, isHost};
}

function setRoomId(newRoomId) {
    return {type: actionTypes.SET_ROOM_ID, newRoomId};
}

function setFibonacciNum(newNum) {
    return {type: actionTypes.SET_FIBONACCI_NUM, newNum}
}

function changePage(newPage) {
    return {type: actionTypes.CHANGE_PAGE, newPage};
}

function updateRooms(newRooms) {
    return {type: actionTypes.UPDATE_ROOMS, newRooms};
}

function addMessage(newMessage) {
    return {type: actionTypes.ADD_MESSAGE, newMessage}
}

function clearMessage() {
    return {type: actionTypes.CLEAR_MESSAGE}
}

function updatePlayers(newPlayers) {
    return {type: actionTypes.UPDATE_PLAYERS, newPlayers}
}

function updateHasVoted(hasVoted) {
    return {type: actionTypes.UPDATE_HAS_VOTED, hasVoted}
}

// It then makes modalOpen be true. Pop pup transparent pane.
function updateErrorMsg(errorMsg) {
    return {type: actionTypes.UPDATE_ERROR_MSG, errorMsg}
}

function setModalOpen(modalOpen) {
    return {type: actionTypes.SET_MODAL_OPEN, modalOpen};
}

let initialState = {
    app: {
        page: pages.LOGIN,
        errorMsg: "",
        modalOpen: false
    },
    login: { name: "" },
    createRoom: { rooms: [] },
    pokerRoom: {
        roomId: "-1",
        isHost: false,
        fibonacciNum: -1,
        messages: [],
        players: [],
        hasVoted: false
    }
};

function stateReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.CHANGE_PAGE:
            return {...state, app: {...state.app, page: action.newPage}};
        case actionTypes.UPDATE_ERROR_MSG:
            return {...state, app: {...state.app, errorMsg: action.errorMsg, modalOpen: true}}
        case actionTypes.SET_MODAL_OPEN:
            return {...state, app: {...state.app, modalOpen: action.modalOpen}}
        case actionTypes.SET_NAME:
            return {...state, login: {...state.login, name: action.newName }};
        case actionTypes.UPDATE_ROOMS:
            return {...state, createRoom: {...state.createRoom, rooms: action.newRooms }};
        case actionTypes.SET_IS_HOST:
            return {...state, pokerRoom: {...state.pokerRoom, isHost: action.isHost}};
        case actionTypes.SET_ROOM_ID:
            return {...state, pokerRoom: {...state.pokerRoom, roomId: action.newRoomId}}
        case actionTypes.SET_FIBONACCI_NUM:
            return {...state, pokerRoom: {...state.pokerRoom, fibonacciNum: action.newNum}}
        case actionTypes.ADD_MESSAGE:
            return {...state, pokerRoom: {...state.pokerRoom, messages: [...state.pokerRoom.messages, action.newMessage]}}
        case actionTypes.CLEAR_MESSAGE:
            return {...state, pokerRoom: {...state.pokerRoom, messages: []}}
        case actionTypes.UPDATE_PLAYERS:
            return {...state, pokerRoom: {...state.pokerRoom, players: action.newPlayers}}
        case actionTypes.UPDATE_HAS_VOTED:
            return {...state, pokerRoom: {...state.pokerRoom, }, hasVoted: action.hasVoted}
        default:
            return state;
    }
}

let store = createStore(stateReducer, initialState);

export { store, pages, setName, changePage, updateRooms, setIsHost, setRoomId, 
    setFibonacciNum, addMessage, clearMessage, updatePlayers,
    updateHasVoted, updateErrorMsg, setModalOpen, UNKNOW_FIBONICA };