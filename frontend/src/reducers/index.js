import { combineReducers } from 'redux';
import auth from './auth';
import postReducer from './post'

export default combineReducers({
    auth,//:authReducer,
    post:postReducer,
});