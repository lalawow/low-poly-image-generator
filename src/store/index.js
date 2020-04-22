import { createStore } from 'redux';
import reducer from './reducer.js';

const initImage = "/images/bird-01.jpg"

const initValues = {
    triangles: {
        accuracy: 75,
        points: 2000,
        grayscale: false
    },
    poissons: {
        space: 5,
        size: 3,
        filled: false,
        stroke: true
    },
    mode: "triangles",
    imageInfo: initImage,
    imageVersion: new Date(),
    render: true
};

const store = createStore(reducer, initValues,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;