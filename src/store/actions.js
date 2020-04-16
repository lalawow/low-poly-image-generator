import * as ActionTypes from './actionTypes.js';

export const setCurrencyList = (currencyList) => {
  return {
    type: ActionTypes.SET_CURRENCY_LIST,
    currencyList
  };
};
