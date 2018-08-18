import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NoteEditor } from '../views/notes';
import api from '../api';
import config from '../config';
import store from '../store';
import * as actions from '../actions/note-actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { throttle, debounce } from 'throttle-debounce';
import '../styles/atom-one-dark.css';


/* Froala Editor
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
*/

const CherryNoteToolbar = () => (
  <div id="note_editor_toolbar">
    <span className="ql-formats">
      <select className="ql-font">
        <option value="sans-serif">Sans Serif</option>
        <option value="Georgia, serif">Serif</option>
        <option value="Monaco, 'Courier New', monospace" selected>Monospace</option>
      </select>
      <select className="ql-size">
        <option value="small"></option>
        <option selected="selected"></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button type="button" className="ql-underline"></button>
      <button type="button" className="ql-strike"></button>
      
    </span>
    <span className="ql-formats">
      <select className="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select>
      <select className="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-script" value="super"></button>
      <button type="button" className="ql-script" value="sub"></button>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-header" value="1"></button>
      <button type="button" className="ql-header" value="2"></button>
      <button type="button" className="ql-blockquote"></button>
      <button type="button" className="ql-code-block"></button>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-list" value="ordered"></button>
      <button type="button" className="ql-list" value="bullet"></button>
      <button type="button" className="ql-indent" value="-1"></button>
      <button type="button" className="ql-indent" value="+1"></button>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-direction"></button>
      <select className="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-link"></button>
      <button type="button" className="ql-image"></button>
      <button type="button" className="ql-video"></button>
      <button type="button" className="ql-formula"></button>
    </span>
    <span className="ql-formats">
      <button type="button" className="ql-clean"></button>
    </span>
  </div>
)

class NoteEditorContainer extends React.Component {
  /*
   * Quill modules to attach to editor
   * See http://quilljs.com/docs/modules/ for complete options
   */
  modules = {
    syntax: true,
    toolbar: {
      container: "#note_editor_toolbar",
      handlers: {
        //"insertStar": insertStar,
      }
    }
  }
   
  /*
   * Quill editor formats
   * See http://quilljs.com/docs/formats/
   */
  formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color',
  ]

  handleChange = debounce(config.content_change_delay, (html) => {
    console.log(this.props.noteInfo);
    if (!this.props.noteInfo.id) return;
    if (this.props.noteInfo.content == html) return;

    this.props.noteInfo.content = html;
    console.log("Updating note: ", this.props.noteInfo);
    api.updateNote(this.props.noteInfo);
  })
 
  render() {
    const content = this.props.noteInfo.content || '';
    const noteName = this.props.noteInfo.name || '';

    return (
      <div className="note-editor">
        <CherryNoteToolbar />
        <ReactQuill
          value={content}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={this.modules}
        />
      </div>
    )
  }
}

/*
class NoteEditorContainer extends Component {
  componentDidMount() {
    const toolBarOptions = {
      container: '#note-editor-tollbar',
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }, { 'direction': [] }],

      ['image', 'video', 'formula'],

      ['clean']                                         // remove formatting button
    };
    const options = {
      debug: 'info',
      modules: {
        toolbar: toolBarOptions
      },
      placeholder: 'Write Your Note Here!',
      readOnly: false,
      theme: 'snow'
    };
    const editor = new Quill('#note-editor-content', options);
  }

  render() {
    //<NoteEditor noteInfo={this.props.noteInfo}/>
    //<FroalaEditor config={froalaConfig} tag='textarea' model={content} />
    const content = this.props.noteInfo.content || '';
    const noteName = this.props.noteInfo.name || '';
    const froalaConfig = {
      placeholderText: 'Write Your Note Here!'
    };
    return (
      <div className='note-editor-wrapper'>
        <div id='note-editor-tollbar'></div>
        <div id='note-title'>{noteName}</div>
        <div id='note-editor-content'>{content}</div>
      </div>
    );
  }
}
*/

const mapStateToProps = function(store) {
  return {
    noteInfo: store.noteState.currentNoteInfo
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChange: function(html) {
      //
    }
  };
}

export default connect(mapStateToProps)(NoteEditorContainer);