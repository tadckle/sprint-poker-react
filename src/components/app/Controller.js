import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModalOpen } from '../../actions/Reducer';
import App from './App';

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

export default AppView;