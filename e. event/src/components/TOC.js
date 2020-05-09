import React, { Component } from 'react';
class TOC extends Component {
    render() {
      console.log('TOC render')
      let list = []
      // key : React.js는 리스트 태그에 key를 요청한다.
      // Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다
      this.props.contents.forEach(content=>{
        list.push(
        <li key={content.id}>
          <a 
            href={`/content/${content.id}`}
            //데이터 등록
            // 이렇게 하면 a 태그의 멤버변수 중에 dataset이 생기며
            // dataset.id = content.id가 된다.
            data-id={content.id} 
            onClick={(e)=>{
              let id = e.target.dataset.id
              this.props.onChangePage(id);
              e.preventDefault();
            }}
            >
            {content.title}
          </a>
        </li>)
      })
      return (
        <nav>
          <ul>
            {list}
          </ul>
        </nav>
      );
    }
  }

  export default TOC; //TOC 컴포넌트를 외부에서도 접근할 수 있게 한다.