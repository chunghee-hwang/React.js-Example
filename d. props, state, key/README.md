# d. props, state, key

## props
props는 html의 attribute 값을 동적으로 변경할 수 있도록 하는 값이다.
```javascript
class App extends Component {
  render() {
    // props를 사용자 정의 태그 옆에 마치 html의 attribute 속성처럼 적을 수 있다.
    return (
      <div className="App">
        <Subject title="WEB" sub="world wide web"/>
      </div>
    );
  };
}

class Subject extends Component {
  // this.props를 통해 서브 컴포넌트가 props를 받을 수 있다.
  // {}를 이용하여 값을 출력할 수 있다.
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

```

#### [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)을 통해 본 컴포넌트의 Props

props를 변경하고 Enter를 누르면, 실시간으로 값을 변경할 수도 있다.

<p align="center">
  <img src="./props.png" >
</p>