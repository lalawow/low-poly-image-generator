import * as ActionTypes from './actionTypes.js';

export default (state, action) => {
  const { data } = action;

  switch (action.type) {
    case ActionTypes.SET_SETTING:
      return { ...state, setting: data };
    case ActionTypes.UPLOAD_IMAGE:
      return { ...state, imageInfo: data, imageVersion: new Date() };
    default:
      return state
  }
}
