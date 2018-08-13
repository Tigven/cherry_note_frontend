import * as types from '../actions/action-types';

const initialState = {
  notes: [],
  noteInfo: {
    //
  }
};

const noteReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.GET_NOTES_SUCCESS:
      return Object.assign({}, state, { notes: action.notes });

    case types.DELETE_NOTE_SUCCESS:
      const newNotes = state.notes;
      return Object.assign({}, state, { notes: newNotes });

    case types.RETREIVE_NOTE_SUCCESS:
      return Object.assign({}, state, { noteInfo: action.noteInfo });

  }

  return state;

}

export default noteReducer;