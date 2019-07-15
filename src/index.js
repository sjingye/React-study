import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducer/index.js';
import AppRouter from './router/router.js';
import 'normalize.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';

let store = createStore(reducers);

store.subscribe(() => {
  console.log(store.getState())
})

render(
  <Provider store={store}>
    <Router >
      <AppRouter />
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
