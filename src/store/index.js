import { createStore } from 'redux';
import reducer from './reducer.js';

const initImage = "/images/bird-01.jpg"

const initValues = {
    setting: {
        accuracy: 75,
        points: 2000,
        grayscale: false
    },
    imageInfo: initImage,
    imageVersion: new Date()
};

const store = createStore(reducer, initValues);

export default store;