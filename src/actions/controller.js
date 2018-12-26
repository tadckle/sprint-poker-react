
let initialState = {
    name: "unknown",
    roomId: "-1",
    isHost: false,
    fibonacciNum: -1
};

const ADD_NAME = "add_name";

function addName(name) {
    return {type: ADD_NAME, name};
}

function PokerApp(state = initialState, action) {
    switch(action.type) {
        case ADD_NAME:
            return {...state, name: action.name};
        default:
            return state;
    }
}

export { addName, PokerApp};