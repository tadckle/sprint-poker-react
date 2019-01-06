import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsHost, setRoomId, setSearchRoomId } from '../../actions/Reducer';
import CreateRoom from './CreateRoom';

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

export default CreateRoomView;