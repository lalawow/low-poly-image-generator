import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import store from './store'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// import 'antd/dist/antd.css';
import './mock'

ReactDOM.render(
    <HashRouter>
        <Provider store={store}><App ></App></Provider>
    </HashRouter>,
    document.querySelector('#root')
)