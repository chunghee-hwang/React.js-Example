import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() {
    return (
      // 반드시 템플릿은 하나의 최상위 태그가 있어야한다.
      // 여러개 있으면 오류가 난다.
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>
    );
  }
}

class TOC extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}

class Content extends Component{
  render(){
    return (
      <article>
        <h2>HTML</h2>
        HTML is HyperText Markup Language.
      </article>
    );
  }
}

class App extends Component {
  render() {
    // 내가 만든 Subject 태그를 사용할 수 있다.
    // template literal 없이 태그를 사용할 수 있다.
    return (
      <div className="App">
        <Subject />
        <TOC />
        <Content />
      </div>
    );
  };
}

export default App;
