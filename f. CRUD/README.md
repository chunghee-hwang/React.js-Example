# f. CRUD

## CRUD 작업?
Create, Read, Update, Delete 작업을 말한다.<br>
React에서 Event, Props, State, Component를 이용하여 해당 기능들을 구현할 수 있다.

<hr />

## delete 작업 시 주의할 점
create, update 작업 시에는 a 태그로 새로운 링크로
어떤 작업을 요청할 수 있으나, delete 작업은 웬만하면 버튼으로 구현하고 링크를 걸지 않는 것이 데이터무결성을 지킬 수 있다.

<hr />

## Component.shouldComponentUpdate()
컴포넌트의 render 함수는 자신이랑 아무런 상관이 없는 state, props가 변경되었을 때도
호출이된다. 이는 성능 저하의 원인이 될 수 있다.<br>
Component.shouldComponentUpdate()을 사용하면 render 함수가 실행되는 조건을 설정 할 수 있다.<br>
render함수 전에 호출되며, render 함수가 호출되야하면 true, 아니라면 false 반환.
```javascript
class TOC extends Component {
    shouldComponentUpdate(newProps, newState){
      // 내용이 바뀌었을 때만 렌더링이 되도록한다.
      //       기존 컨텐트 배열       새로운 컨텐트 배열
      return this.props.contents !== newProps.contents
    }
}
```

## state 안에 있는 배열을 수정할 경우

#### push vs concat

다음과 같이 contents 배열이 state에 있다고 하자.
```javascript
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      contents: []
    }
  }
```

Array.push 함수는 배열 원본을 변경하는 반면,<br>
Array.concat 함수는 배열 원본을 변경하지 않고 원소를 추가한 결과값을 반환한다.<br>
##### push를 사용할 경우

```javascript
this.state.contents.push({
    {id: this.max_content_id, title, desc}
});
this.setState({
    contents: this.state.contents
});
```

##### concat을 사용할 경우

```javascript
let contents = this.state.contents.concat({
    {id: this.max_content_id, title, desc}
});
this.setState({contents});
```

두 함수의 성능은 크게 차이가 없지만, push를 사용할 경우 Component.shouldComponentUpdate()에서
렌더링할 지 말지 결정하는 작업에 문제가 생기게된다.<br>
왜냐하면 원본 배열이 바뀌었으니 새로 바뀐 배열과 이전 배열의 차이가 없기 때문이다.<br>
결국 렌더링이 되지 않는다. 따라서 복제본을 수정하는 concat을 사용하는 것이 옳다.



## 원본이 변하지 않는 연산(immutable), 복사 연산
concat 대신 push를 꼭 사용해야한다면 다음과 같이 배열을 복제할 수도 있다.

### 배열 복사
```javascript
let a = [1, 2];
let b = Array.from(a); // 배열 복사
b.push(3);
console.log(a===b); // print false
```

### 객체 복사
```javascript
let a = {name:'hwang'};
let b = Object.assign({}, a); // 객체 복사
let c = Object.assign({left:1, right: 2}, a)
console.log(a, b, a === b); // print {name:'hwang'} {name:'hwang'} false
console.log(c); // print {left:1, right: 2, name:'hwang}
```

## push든 concat이든 무조건 원본을 복사해주는 모듈이 있다?
[immutable.js](https://github.com/immutable-js/immutable-js) 모듈이 그 기능을 해주니, 참고하는 것이 좋겠다.

## 부모에서 넘어온 props의 내용을 자식 컴포넌트의 input 태그에 그냥 넣으면?
props의 내용은 read-only이기 때문에 input에 넣으면 값을 입력창에서 내용을 수정할 수 없게 변한다.
```javascript
class UpdateContent extends Component {
  render() {
    return (
      <input
        type="text"
        name="title"
        placeholder="title"
        value={this.props.content.title}
      >
      </input>
    );
  }

/*
Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`
*/
```

### 해결법
부모에게 넘어온 props를 자식의 state로 변경한 뒤 input에 입력한다.<br>
그렇게 한 뒤에 실행해도 에러가 발생한다.<br>
왜냐하면 입력창의 내용을 수정해도 state값이 변경되지 않기 때문에, 데이터 무결성에 오류가 생기기 때문이다.<br>
onChange 이벤트 콜백을 등록하고 콜백에서 state를 변경하면 된다.<br>

그런데 input의 타입이 만약 hidden이라면 onChange 콜백을 등록하지 않아도 된다.

```javascript
class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.content.title
    }
  }
  render() {
    return (
      <input
        type="text"
        name="title"
        placeholder="title"
        value={this.state.title}
        onChange={(e)=>{this.setState({title: e.target.value})}}
      >
      </input>
    );
  }
```

<hr />

##  객체의 key값을 파라미터로 받고싶을 때
[] 문법을 사용하여 받을 수 있다.
```javascript
func(name){
  let obj = {[name]: 'hwang'};
}
```


<hr />

## 그 밖에 공부할 것들
1. immutable.js
2. redux
3. router
4. server side rendering
5. react native(리액스 스마트폰 어플)