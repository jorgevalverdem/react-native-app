import {combineReducers} from 'redux';
import loader from '../reducers/loader';

const rootReducerCore = combineReducers({
  loader,
});

export default rootReducerCore;
