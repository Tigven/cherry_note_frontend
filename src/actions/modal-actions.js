import * as types from './action-types';

export function showAuthModal() {
  return {
    type: types.SHOW_AUTH_MODAL
  };
}

export function hideAuthModal() {
  return {
    type: types.HIDE_AUTH_MODAL
  };
}
