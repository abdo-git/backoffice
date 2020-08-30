import courReducer from "./courReducer";
import authReducer from "./authReducer";
import chapReducer from './chapReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    cour: courReducer,
    chap: chapReducer
})

export default rootReducer
