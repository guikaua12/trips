import { combineReducers } from 'redux';
import userReducer from '@/redux/user/reducer';

export const rootReducer = combineReducers({
    userReducer,
});
