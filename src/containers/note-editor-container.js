import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NoteEditor } from '../views/notes';
import api from '../api';
import store from '../store';
import * as actions from '../actions/note-actions';

class NoteEditorContainer extends Component {
  componentDidMount() {
    //api.getNotes();
  }

  render() {
    return (
      <NoteEditor />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    
  };
};

export default connect(mapStateToProps)(NoteEditorContainer);