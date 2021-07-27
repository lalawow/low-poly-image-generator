import { createStore } from 'redux';
import reducer from './reducer.js';
import { imageModes } from '../lib/constants'

const initImage = "/images/bird-01.jpg"

const initValues = {
    Triangles: {
        accuracy: 75,
        points: 2000,
        grayscale: false
    },
    Poissons: {
        space: 5,
        size: 3,
        filled: false,
        stroke: true
    },
    mode: imageModes.Triangles,
    imageInfo: initImage,
    imageVersion: new Date(),
    render: true
};

const store = createStore(reducer, initValues,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;