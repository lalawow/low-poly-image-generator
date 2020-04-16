import { createStore } from 'redux';
import reducer from './reducer.js';

import { DefaultShowCurrency } from "../constants"
import { getItem} from "../lib/localStorageActions"

const initValues = {
  currencyList: getItem("currencyList") || DefaultShowCurrency,
};

const store = createStore(reducer, initValues, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;