import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
// App 컴포넌트를 Provider로 감싼다.
// App 컴포넌트는 Provider가 지배한다.
// provider는 store를 provider의 모든 하위 컴포넌트에게 제공하는 역할을 한다.
// 즉 store를 import를 할 필요가 없게 한다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
