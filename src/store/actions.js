import * as ActionTypes from './actionTypes.js';

export const setSetting = (data) => {
  return {
    type: ActionTypes.SET_SETTING,
    data: data
  };
};

export const setMode = (data) => {
  return {
    type: ActionTypes.SET_MODE,
    data: data
  };
};


export const uploadImage = (imageInfo) => {
  return {
    type: ActionTypes.UPLOAD_IMAGE,
    data: imageInfo
  };
}

export const renderControl = (action) => {
  return {
    type: ActionTypes.RENDER_CONTROL,
    data: action
  };
}