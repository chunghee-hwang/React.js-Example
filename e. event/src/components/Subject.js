import React, { Component } from 'react';

class Subject extends Component {
  render() {
    console.log('Subject render')
    // onclick: 오리지널 자바스크립트 리스너
    // onClick: 리액트의 자바스크립트 리스너
    return (
      <header>
        <h1><a href="/" onClick={this.handleClick}>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    );
  }
  handleClick = (event) => {
    event.preventDefault(); // a태그의 href로 인한 앱 새로고침 방지
    this.props.onChangePage(); //props로 넘어온 콜백함수를 실행해서, 부모 컴포넌트에게 state를 바꾸라는 신호를 보낸다.

  }
}

export default Subject;