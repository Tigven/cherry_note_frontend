import React, { Component } from 'react';

export class NotesTree extends Component {
  render() {
    let notes = this.props.notes.map(note => {
        return (
            <div className='notes-tree__note-item'>
                {note.name}
            </div>
        );
    });
    return (
      <div className='notes-tree'>
      	{notes}
      </div>
    );
  }
}


export class NoteEditor extends Component {
  render() {
    const content = this.props.noteInfo.content || 'CherryNote Web Editor';
    return (
      <div className='note-edutor'>
      	<p>{content}</p>
      </div>
    );
  }
}

