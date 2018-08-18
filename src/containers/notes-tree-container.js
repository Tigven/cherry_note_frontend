import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotesTree } from '../views/notes';
import api from '../api';
import store from '../store';
import { getNotesSuccess, retreiveNoteSuccess } from '../actions/note-actions';
import Tree from '../libs/react-ui-tree/react-ui-tree';

/*
TODO:
* Возможность переместить узел-лист в другой узел-лист;
* Реализовать событие, срабатывающее на drag-n-ndrop узла в другой узел;
*/

class NotesTreeContainer extends Component {
  state = {
    activeNode: null
  }

  convertNotes(notes) {
    const _this = this;

    return notes.map((note) => {
      let treeNode = {
        'module': note.name,
        'metaInfo': note
      };
      if (note.children && note.children.length) {
        treeNode['collapsed'] = !note.is_expanded;
        treeNode['children'] = _this.convertNotes(note.children);
      } else if (note.children && note.children.length == 0) {
        treeNode['collapsed'] = true;
        treeNode['children'] = [];
      } else treeNode['leaf'] = true;
  
      return treeNode;
    });
  }

  getTreeFromNotes(notes) {
    return {
      'module': 'Notes',
      'children': this.convertNotes(notes)
    };
  }

  componentDidMount() {
    api.getNotesList(function(resp){
        store.dispatch(getNotesSuccess(resp));
    });
  }

  renderNode(node) {
    const _this = this;
    const nodeOnMouseUp = (node) => {
      const lastMouseDownTime = node.lastMouseDownTime || 0;
      const currentTime = new Date().getTime();
      const clickDelta = currentTime - lastMouseDownTime;

      //console.log('Node `' + node.module + '` clickDelta: ' + clickDelta);
      if (clickDelta < 300) {
        if (!node || !node.metaInfo) return;
        _this.setState({activeNode: node});
        //console.log('STATE: ', _this.state);

        if (node.metaInfo.content === undefined) {
          api.getNoteInfo(node.metaInfo.id, function(resp) {
            node.metaInfo.content = resp.content;
            store.dispatch(retreiveNoteSuccess(resp));
          });
        } else {
          store.dispatch(retreiveNoteSuccess(node.metaInfo));
        }
      }
    };
    const nodeOnMouseDown = (node) => {
      node.lastMouseDownTime = new Date().getTime();
    };
    const onClickNode = (node) => {
      //
    };
     
    //console.log('Render Node: ', node, 'state_node: ', _this.state.activeNode);
    let nodeClassName = 'notes-tree__node';
    const clickedNodeId = node.metaInfo ? node.metaInfo.id : null;
    const currentNodeId = _this.state.activeNode ? _this.state.activeNode.metaInfo.id : null;
    if (currentNodeId !== null && clickedNodeId == currentNodeId)
      nodeClassName += ' ' + 'active-node';

    return (
      <span
        className={nodeClassName}
        onClick={onClickNode.bind(null, node)}
        onMouseUp={nodeOnMouseUp.bind(null, node)}
        onMouseDown={nodeOnMouseDown.bind(null, node)}
      >
        {node.module}
      </span>
    );
  }

  render() {
    //<NotesTree notes={this.convertNotes(this.props.notes)}/>
    return (
      <div className="notes-tree">
        <div className="notes-panel">
        </div>
        <div>
          <Tree
            paddingLeft={20}
            tree={this.getTreeFromNotes(this.props.notes)}
            onChange={this.handleChange}
            onNodeDragged={this.handleNodeDragged}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode.bind(this)}
          />
        </div>
      </div>
    );
  }

  handleNodeDragged(nodeDragged, nodeDraggedParent) {
    const nodeDraggedParentId = nodeDraggedParent && nodeDraggedParent.metaInfo ? nodeDraggedParent.metaInfo.id : null;
    const nodeDraggedMetaParentId = nodeDragged.metaInfo.parent ? nodeDragged.metaInfo.parent.id : null;
    // Check if current Note has been dragged into new Note (parent has been changed)
    if (nodeDraggedMetaParentId != nodeDraggedParentId) {
      nodeDragged.metaInfo.parent.id = nodeDraggedParent.metaInfo.id;
      api.updateNote(nodeDragged.metaInfo);
    }
  }

  handleChange(tree) {
  }
}

const mapStateToProps = function(store) {
  return {
    notes: store.noteState.notes
  };
};

export default connect(mapStateToProps)(NotesTreeContainer);