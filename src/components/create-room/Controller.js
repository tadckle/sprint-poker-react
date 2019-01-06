import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsHost, setRoomId } from '../../actions/Reducer';
import CreateRoom from './CreateRoom';

const CreateRoomView = connect(state => {
    return {
        name: state.login.name,
        rooms: state.createRoom.rooms
    }
}, dispatch => {
    return {
        setIsHost: bindActionCreators(setIsHost, dispatch),
        setRoomId: bindActionCreators(setRoomId, dispatch),
    }
})(CreateRoom);

export default CreateRoomView;