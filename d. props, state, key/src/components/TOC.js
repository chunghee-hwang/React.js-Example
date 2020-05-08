import React, { Component } from 'react';
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

  export default TOC; //TOC 컴포넌트를 외부에서도 접근할 수 있게 한다.