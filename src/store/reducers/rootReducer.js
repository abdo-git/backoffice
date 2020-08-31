import courReducer from "./courReducer";
import authReducer from "./authReducer";
import chapReducer from './chapReducer'
import ongletReducer from './ongletReducer'
import { combineReducers } from 'redux';
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    cour: courReducer,
    chap: chapReducer,
    onglet: ongletReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer
