import { combineReducers } from 'redux';

// Reducers
import noteReducer from './note-reducer';
import modalReducer from './modal-reducer';

// Combine Reducers
var reducers = combineReducers({
    noteState: noteReducer,
    modalState: modalReducer
});

export default reducers;