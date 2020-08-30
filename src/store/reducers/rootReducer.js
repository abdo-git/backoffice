import courReducer from "./courReducer";
import authReducer from "./authReducer";
import chapReducer from './chapReducer'
import ongletReducer from './ongletReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    cour: courReducer,
    chap: chapReducer,
    onglet: ongletReducer
})

export default rootReducer
