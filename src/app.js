import React, { Component } from 'react';
import NotesTreeContainer from './containers/notes-tree-container';
import NoteEditorContainer from './containers/note-editor-container';
import AuthModalContainer from './containers/auth-modal-container';

/*
import api from './api';
api.getNotesList(function(resp) {
    console.log('Notes: ', resp);
});
*/

/*
<NotesTreeContainer />
*/

export class Notes extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='modals'>
            <AuthModalContainer />
        </div>
        <NotesTreeContainer />
        <NoteEditorContainer />
      </div>
    );
  }
}

export const Main = () => (
  <main>
    <Notes />
  </main>
)

const Header = () => (
  <header>
    <nav>
    </nav>
  </header>
)

class CherryNoteApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}


export default CherryNoteApp;
