import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import './CreateRoom.css';

class CreateRoom extends Component {

    constructor(props) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.onSearchRoomIdChange = this.onSearchRoomIdChange.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    onSearchRoomIdChange(event) {
        this.props.setSearchRoomId(event.target.value);
    }

    enterClicked(event) {
        if (event.keyCode === 13) {
            this.joinRoom(this.props.searchRoomId);
        }
    }

    createRoom(event) {
        this.props.setIsHost(true);
        this.context.sendMessage(this.context.cmdTypes.CREATE_ROOM);
    }

    joinRoom(roomId) {
        this.props.setRoomId(roomId);
        this.context.sendMessage(this.context.cmdTypes.JOIN_ROOM);
    }

    render() {
        let rooms = this.props.rooms;
        return (
            <div id="create_room">
                <h1 id="welcomeTxt" className="ui header">Welcome to poker room, {this.props.name}</h1>
                <div className="ui divider"></div>

                <div id="headDiv">
                    <div id="createBtn">
                        <button id="createRoomBtn" className="ui positive button" onClick={this.createRoom}>Create a new room</button>
                    </div>
                    <div id="joinDiv">
                        <Input action={{
                            className: "ui primary button",
                            content: "Join",
                            onClick: this.joinRoom.bind(this, this.props.searchRoomId)
                        }}
                        placeholder='Enter room id ...' 
                        value={this.props.searchRoomId} 
                        onKeyUp={this.enterClicked}
                        onChange={this.onSearchRoomIdChange} />
                    </div>
                </div>

                <table id="availableRooms" className="ui celled padded table">
                    <thead>
                        {rooms.length <= 0 
                            ? <tr><th>There's no available room.</th></tr> 
                            : <tr><th width='150'>Room ID</th><th width='150'>Creator</th><th>Action</th></tr>}
                    </thead>
                    <tbody>
                        {rooms.map(room => <tr key={room.roomNum}>
                            <td>{room.roomNum}</td>
                            <td>{room.creator}</td>
                            <td><button className='ui button' onClick={this.joinRoom.bind(this, room.roomNum)}>Join</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }

}

CreateRoom.contextTypes = {
    cmdTypes: PropTypes.object,
    sendMessage: PropTypes.func
}

export default CreateRoom;