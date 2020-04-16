import * as ActionTypes from './actionTypes.js';

export default (state, action) => {
  const { data } = action;

  switch (action.type) {
    case ActionTypes.SET_MODE:
      return { ...state, "mode": data.mode };
    case ActionTypes.SET_SETTING:
      let setting = Object.assign({}, state[state.mode])
      setting[data.type] = data.value
      return { ...state, [state.mode]: setting };
    case ActionTypes.UPLOAD_IMAGE:
      return { ...state, imageInfo: data, imageVersion: new Date() };
    case ActionTypes.RENDER_CONTROL:
      return { ...state, render: data };
    default:
      return state
  }
}
