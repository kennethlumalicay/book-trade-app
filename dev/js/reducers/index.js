import {combineReducers} from 'redux';
import UserReducer from './reducer-user';
import BookReducer from './reducer-book';


const allReducers = combineReducers({
    user: UserReducer,
    books: BookReducer
});

export default allReducers;