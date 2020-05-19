import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';
function Home(){
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

let contents = [
  {id: 1, title: 'HTML', desc: 'HTML is...'},
  {id: 2, title: 'JS', desc: 'JS is...'},
  {id: 3, title: 'React', desc: 'React is...'}
]
function Topic(){
  let params = useParams();
  let topic_id = Number(params.topic_id);
  let selected_topic = {
    title:'Sorry',
    desc: 'Not Found'
  };
  if(topic_id > 0 && topic_id <= contents.length){
    selected_topic = contents[topic_id-1];
  }
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.desc}
    </div>
  );
}
function Topics(){
  let lis = 
  contents.reduce((accumulator, content)=>{
    accumulator.push(
      <li key={content.id}>
        <NavLink to={`/topics/${content.id}`}>
          {content.title}
        </NavLink>
      </li>
    );
    return accumulator;
  }, [])
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Route path="/topics/:topic_id">
        <Topic />
      </Route>
    </div>
  );
}

function Contact(){
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

function App(){
  return (
    <div>
      <h1>React Router Dom example</h1>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>

      </ul>
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/topics"><Topics/></Route>
        <Route path="/contact"><Contact/></Route>
        <Route path="/">Not Found</Route>
      </Switch>
    </div>
  );
}

// 라우터를 사용하기 위해 App component를 BrowserRouter로 감싼다.
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
