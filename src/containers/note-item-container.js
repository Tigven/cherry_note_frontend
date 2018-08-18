import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotesTree } from '../views/notes';
import api from '../api';
import store from '../store';
import { getNotesSuccess } from '../actions/note-actions';

class NotesTreeContainer extends Component {
  componentDidMount() {
    api.getNotesList(function(resp){
        store.dispatch(getNotesSuccess(resp));
    });
  }

  render() {
    return (
      <NotesTree notes={this.props.notes}/>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    notes: store.noteState.notes
  };
};

export default connect(mapStateToProps)(NotesTreeContainer);