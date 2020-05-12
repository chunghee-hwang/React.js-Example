import React, { Component } from 'react';

class Control extends Component {
  render() {
    console.log('Subject render')
    // onclick: 오리지널 자바스크립트 리스너
    // onClick: 리액트의 자바스크립트 리스너
    return (
      <div>
        <li><a href="/create" onClick={(e)=>this.changeMode('create', e)}>create</a></li>
        <li><a href="/update" onClick={(e)=>this.changeMode('update', e)}>update</a></li>
        <li><input type="button" value="delete" onClick={(e)=>this.changeMode('delete', e)}></input></li>
      </div>
    );
  }
  changeMode = (mode, e) => {
    e.preventDefault(); // a태그의 href로 인한 앱 새로고침 방지
    this.props.onChangeMode(mode);
  }
}

export default Control;