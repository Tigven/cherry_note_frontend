import * as types from '../actions/action-types';

const initialState = {
  authShow: false
};

const modalReducer = function(state = initialState, action) {

  switch(action.type) {

    case types.SHOW_AUTH_MODAL:
      return Object.assign({}, state, {authShow: true});

    case types.HIDE_AUTH_MODAL:
      console.log(state);
      return Object.assign({}, state, {authShow: false});

  }

  return state;

}

export default modalReducer;