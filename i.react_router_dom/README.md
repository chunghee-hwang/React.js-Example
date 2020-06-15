# 리액트 라우터 돔

라우터는 여러 개의 URL을 입력했을 때, 상응하는 여러 개의 페이지를 앱에 구현할 때 사용한다.<br>
리액트는 React Router Dom API를 사용하여 구현할 수 있다.

React Router Dom 공식 홈: [링크](https://reacttraining.com/react-router/web/guides/quick-start)<br>

## 설치법
```
npm install react-router-dom
```

## [Route](https://reacttraining.com/react-router/web/api/Route)
```javascript
<a href="/something">To Something</a>
<Route path="/something"><해당 URL일 때 보여질 컴포넌트 /></Route>
```

## [Route > Exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)
### 기존 라우팅의 문제점
link: http://localhost:3000/<br>
잡히는 라우트: "/"<br><br>

link: http://localhost:3000/topics<br>
잡히는 라우트: "/", "/topics"<br>
위 처럼 "/topics" 뿐만 아니라 상위 라우트인 "/"도 잡혀버린다.<br><br>

해결법: exact를 추가하면 정확하게 URL이 맞는 것만 보인다.<br>
```javascript
//index.js
import { BrowserRouter, Route } from "react-router";
//...
<Route exact path="/one">
  <About />
</Route>
//...
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

## [Switch](https://reacttraining.com/react-router/web/api/Switch)
Switch 태그 안에 있는 Route 태그들의 path들을 순차탐색하며,<br>
일치하는 것이 있다면 탐색을 멈추고 해당 컴포넌트를 출력한다.<br>
URL이 "/contact"고 맨 위에 있는 Route 태그의 path가 "/"라면<br>
path는 "/"에 걸리게 된다. exact일 경우에는 안걸린다.<br>
```javascript
import { Route, Switch } from "react-router";
let routes = (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/:user">
      <User />
    </Route>
    <Route>
      <NoMatch />
    </Route>
  </Switch>
);
```
## Not found
Switch를 이용해 존재하지 않는 URL을 입력했을 때 처리를 할 수 있다.
```javascript
<Switch>
    <Route path="/" exact><Home/></Route>
    <Route path="/topics"><Topics/></Route>
    <Route path="/contact"><Contact/></Route>

    //  순차탐색 맨 마지막에서 걸린다.
    <Route path="/">Not Found</Route> 
</Switch>
```
## [Link](https://reacttraining.com/react-router/web/api/Link)
Single Page Application에서 중요한 거는
페이지가 리로드되지않고, 코딩이나 AJAX를 이용해서, 비동기적으로 데이터를 페이지를 렌더링하는 것이 중요하다.<br>
페이지를 새로고침하지 않게 바꾸는 것이 Link 태그다.<br>
a 태그 대신에 사용하면 좋다.
```javascript
import { Link } from 'react-router-dom'
<Link to="/about">About</Link>
```
## [NavLink](https://reacttraining.com/react-router/web/api/NavLink)
Link 태그에 스타일 기능이 추가된 태그다.<br>
이 태그도 스타일에 exact를 줘야 정확한 URL일 때만 스타일이 바뀐다.<br>실제 html에서는 a 태그에 active class가 추가된다. 따라서, css를 이용해서 현재 사용자가 있는 페이지가 어딘지 직관적으로 알려줄 수 있다.<br>
또는 다음과 같이 스타일을 변경할 수 있다.
```javascript
import { NavLink } from 'react-router-dom'
<NavLink
  exact
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```
## Nested Routing
라우트 안에 라우트를 둘 수도 있다.
```javascript
function App(){
  return (
    <div>
      <h1>React Router Dom example</h1>
      <ul>
        <li><NavLink exact to="/topics">Topics</NavLink></li>
      </ul>
      <Switch>
        <Route path="/topics"><Topics/></Route>
      </Switch>
    </div>
  );
}
function Topics(){
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li><NavLink to="/topics/1">HTML</NavLink></li>
      </ul>
      <Switch>
        <Route path="/topics/1">
          HTML is ...
        </Route>
      </Switch>
    </div>
  );
}

```
## [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams)

switch 태그 안에 여러 개의 라우트를 쓸 필요 없이, useParams hook을 사용하면 파라미터를 받을 수 있다.

### useParams를 사용하지 않을 경우
```javascript
let contents = [
  {id: 1, title: 'HTML', desc: 'HTML is...'},
  {id: 2, title: 'JS', desc: 'JS is...'},
  {id: 3, title: 'React', desc: 'React is...'}
];
function Topics(){
  let lis = 
  contents.reduce((accumulator, content)=>{
    accumulator.push(
      <li key={content.id}>
        <NavLink to={`/topics/${content.id}`}>
          {content.title}
        </NavLink>
      </li>
    );
    return accumulator;
  }, [])
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Switch>
        <Route path="/topics/1">HTML is...</Route>
        <Route path="/topics/2">JS is...</Route>
        <Route path="/topics/3">React is...</Route>
    </Switch>
    </div>
  );
}
```

### useParams를 사용할 경우
```javascript
function Topic(){
  let params = useParams(); // 파라미터를 받는 함수.
  let topic_id = Number(params.topic_id);
  let selected_topic = {
    title:'Sorry',
    desc: 'Not Found'
  };
  if(topic_id > 0 && topic_id <= contents.length){
    selected_topic = contents[topic_id-1];
  }
  return(
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.desc}
    </div>
  );
}
function Topics(){
  let lis = 
  contents.reduce((accumulator, content)=>{
    accumulator.push(
      <li key={content.id}>
        <NavLink to={`/topics/${content.id}`}>
          {content.title}
        </NavLink>
      </li>
    );
    return accumulator;
  }, [])
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Route path="/topics/:topic_id">
        <Topic />
      </Route>
    </div>
  );
}
```
## 그 밖에 React Router Dom의 기능
### [Server Side Rendering](https://reacttraining.com/react-router/web/guides/server-rendering)
우리가 위에서 만든 페이지는 동적 웹 페이지다.<br>
그런데 네이버와 같은 검색 엔진은 정적 웹 페이지가 없으면 처리하기 어렵다.
Server Side Rendering(서버에서 렌더링)을 이용하면 최종적으로 정적인 웹 사이트로 바꿀 수 있다.

### [Code Splitting](https://reacttraining.com/react-router/web/guides/code-splitting)
웹 페이지의 용량이나 컴포넌트가 매우 크다면 적당히 쪼개서 필요할 때마다 로드할 수 있다.
