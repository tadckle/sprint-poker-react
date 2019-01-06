import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setName } from '../../actions/Reducer';
import Login from './Login';

const LoginView = connect(state => {
    return {name: state.name}
}, dispatch => {
    return {setName: bindActionCreators(setName, dispatch)}
})(Login);

export default LoginView;