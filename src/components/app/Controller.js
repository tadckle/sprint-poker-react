import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModalOpen } from '../../actions/Reducer';
import App from './App';

const AppView = connect(state => {
    return {
        page: state.app.page,
        errorMsg: state.app.errorMsg,
        modalOpen: state.app.modalOpen
    }
}, dispatch => {
    return {
        setModalOpen: bindActionCreators(setModalOpen, dispatch)
    }
})(App)

export default AppView;