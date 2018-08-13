import * as types from './action-types';

export function getNotesSuccess(notes) {
  return {
    type: types.GET_NOTES_SUCCESS,
    notes
  };
}

export function deleteNoteSuccess(noteId) {
  return {
    type: types.DELETE_NOTE_SUCCESS,
    noteId
  };
}

export function retreiveNoteSuccess(noteInfo) {
  return {
    type: types.RETREIVE_NOTE_SUCCESS,
    noteInfo
  };
}