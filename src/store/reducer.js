import * as ActionTypes from './actionTypes.js';

export default (state, action) => {
  const { currencies } = action;

  switch (action.type) {
    case ActionTypes.SET_CURRENCY:
      console.log("set currency", state, action)
      return { ...state, currencies: currencies, currencyLabel: new Date() };
    default:
      return state
  }
}
