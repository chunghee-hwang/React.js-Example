// ie polyfill 코드
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //App.js
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  // 여기서 App 태그는 우리가 정의한 component
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
