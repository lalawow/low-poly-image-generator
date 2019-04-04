import { createStore } from 'redux';
import reducer from './reducer.js';

const initValues = {
    currencies: [],
    currencyLabel: new Date()
};

const store = createStore(reducer, initValues);

export default store;