import React, { Component } from 'react';
import TOC from './components/TOC'
import Content from './components/Content'
import Subject from './components/Subject'
import './App.css';


class App extends Component {
  // 생성자: 초기화 담당
  constructor(props){
    super(props)

    //state: 내부적으로 사용하는 값.
    this.state = {
      subject:{title: 'WEB', sub: 'World Wide Web!'}
    }
  }
  render() {
    // 상위 컴포넌트에서 하위 컴포넌트로 값을 줄 때 props를 사용한다.
    // 컴포넌트에 props를 넘겨줄 때, 하드코딩이 아닌 state값을 던져준다.
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}/>
        <Subject title="React" sub="For UI"/>
        <TOC/>
        <Content title="HTML" desc="HTML is HyperText markup Language"/>
      </div>
    );
  };
}

export default App;
