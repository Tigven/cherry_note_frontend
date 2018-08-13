import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthModal from '../views/modals';
import api from '../api';
import store from '../store';
import { hideAuthModal } from '../actions/modal-actions';

class AuthModalContainer extends Component {
  render() {
    return (
      <AuthModal 
        show={this.props.show}
        handleClose={this.props.handleClose}
        handleAuth={this.props.handleAuth}
      />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    show: store.modalState.authShow
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleClose: function() {
      dispatch(hideAuthModal());
    },
    
    handleAuth: function() {
      const username = $('#username').val();
      const password = $('#password').val();

      api.authorize(username, password, function(resp) {
        dispatch(hideAuthModal());
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModalContainer);