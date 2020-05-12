import React, { Component } from 'react';

import TOC from './components/TOC'
import Subject from './components/Subject'
import Control from './components/Control'

import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

import './App.css';


class App extends Component {
  // 생성자: 초기화 담당
  constructor(props) {
    super(props)
    //state: 내부적으로 사용하는 값.
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 1,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'welcome', desc: 'Hello, React!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText markup Language' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }
  getCorrespondingContent(contents, find_id) {
    return contents.find(content => content.id === find_id);
  }
  getContentComponent() {
    let article = null;
    if (this.state.mode === 'welcome') {
      let content = {
        title: this.state.welcome.title,
        desc: this.state.welcome.desc
      }
      article = <ReadContent content={content} />;
    }
    else if (this.state.mode === 'read') {
      let content = this.getCorrespondingContent(this.state.contents, this.state.selected_content_id);
      if (content)
        article = <ReadContent content={content} />;
    }
    else if (this.state.mode === 'create') {
      article = <CreateContent onSubmit={(title, desc) => {
        // this.state.content에 내용 추가
        let contents = Array.from(this.state.contents); // 원본 배열 복제
        contents.push({ id: ++this.max_content_id, title, desc });
        this.setState({
          mode: 'read',
          contents: contents,
          selected_content_id: this.max_content_id
        });
      }} />
    }
    else if (this.state.mode === 'update') {
      let contents = Array.from(this.state.contents);
      let content = this.getCorrespondingContent(contents, this.state.selected_content_id);
      if (!content) return null;
      article = <UpdateContent content={content} onSubmit={(id, title, desc) => {
        // this.state.content에 내용 수정
        let content = this.getCorrespondingContent(contents, id);
        if (content) {
          content.title = title;
          content.desc = desc;
          this.setState({
            mode: 'read',
            contents: contents
          });
        }
      }} />
    }
    return article;
  }
  render() {
    // 상위 컴포넌트에서 하위 컴포넌트로 값을 줄 때 props를 사용한다.
    // 컴포넌트에 props를 넘겨줄 때, 하드코딩이 아닌 state값을 던져준다.
    console.log('App render')
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: 'welcome' })
          }}
        />
        <TOC
          contents={this.state.contents}
          onChangePage={(id) => {
            // alert('TOC onChangePage')
            console.log(id)
            this.setState({ mode: 'read', selected_content_id: Number(id) })
          }}
        />
        <Control onChangeMode={(mode) => {
          if (mode === 'delete') {
            if(window.confirm('정말 삭제할까요?')){
              let contents = Array.from(this.state.contents);
              let deleteIdx = contents.findIndex(content => content.id === this.state.selected_content_id)
              if(deleteIdx!==-1){
                contents.splice(deleteIdx, 1)
                this.setState({
                  mode: 'welcome',
                  contents: contents
                });
                alert('삭제되었습니다.');
              }
            }
          } else {
            this.setState({
              mode
            });
          }
        }} />
        {this.getContentComponent()}
      </div>
    );
  };
}

export default App;
