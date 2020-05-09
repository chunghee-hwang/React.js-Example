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
      mode: 'read',
      selected_content_id:1,
      subject:{title: 'WEB', sub: 'World Wide Web!'},
      welcome:{title:'welcome', desc:'Hello, React!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is HyperText markup Language'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    // 상위 컴포넌트에서 하위 컴포넌트로 값을 줄 때 props를 사용한다.
    // 컴포넌트에 props를 넘겨줄 때, 하드코딩이 아닌 state값을 던져준다.
    console.log('App render')
    let _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
      const con = this.state.contents.find(content=> content.id === this.state.selected_content_id);
      _title = con.title;
      _desc = con.desc;
    }

    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={()=>{
          this.setState({mode: 'welcome'})
        }}
        />
        <TOC 
        contents={this.state.contents}
        onChangePage={(id)=>{
          // alert('TOC onChangePage')
          console.log(id)
          this.setState({mode: 'read', selected_content_id: Number(id)})
        }}
        />
        <Content title={_title} desc={_desc}/>
      </div>
    );
  };
}

export default App;
