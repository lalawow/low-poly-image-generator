import * as ActionTypes from './actionTypes.js';
import moment from "moment"

export default (state, action) => {
  const { currencyList } = action;

  switch (action.type) {
    case ActionTypes.SET_CURRENCY_LIST:
      return { ...state, currencyList };
    default:
      return state
  }
}
