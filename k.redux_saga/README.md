# 리덕스 사가

이 레포지토리는 [리덕스 미들웨어와 외부 데이터 연동](https://redux-advanced.vlpt.us/2/05.html) 튜토리얼을 참고했습니다. <br><br>

선행 공부해야할 목록은 다음과 같습니다.<br>
* [리덕스](https://github.com/hch0821/Redux-Example)
* [리액트 리덕스](../g.react_redux/)

## 리덕트 사가란?
> redux-saga 는 비동기작업처럼, 리듀서에서 처리하면 안되는 순수하지 않은 작업들을 하기 위한 리덕스 [미들웨어](https://redux-advanced.vlpt.us/1/01.html)입니다.
redux-thunk 의 경우 함수를 dispatch 해주었고, reduix-promise-middleware 나 redux-pender 에선 Promise 가 들어있는 액션을 dispatch 해주었다면, redux-saga 에서는 일반 액션을 dispatch 하게 됩니다.
그리고, 특정 액션이 발생하면 이를 모니터링 하여 이에 기반하여 추가적인 작업을 하도록 설계합니다.
redux-saga 에서는 [Generator](https://wonism.github.io/javascript-generator/) 라는 것을 사용해서 function* 같은 문법을 사용하게 됩니다.


## 모듈 설치
```bash
npm i redux --save # 리덕스
npm i react-redux --save # 리액트 리덕스
npm i redux-saga --save # 리덕스 사가
npm i redux-actions --save # 리덕스 액션
npm i axios --save # http 통신 모듈
npm i redux-devtools-extension --save # 리덕스 개발 툴(크롬 확장 앱과 연결)
npm i --save redux-logger # 리덕스 로거
```

## [Effect creators](https://redux-saga.js.org/docs/api/)

* put : store에 새 액션을 dispatch 한다.
```javascript
put({type: 'INCREMENT'});
```
* delay: 작업을 지연시킨다. 단위 :ms
```javascript
delay(100);
```
* takeEvery: 특정 액션을 감시하다가 발생하면 특정 함수를 발생시킨다.
```javascript
function* incrementAsyncSaga() {
    yield put(increment());
}
takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
```

* call: 첫번째 파라미터로 전달한 함수에 그 뒤에 있는 파라미터들은 전달하여 호출해준다. 이를 사용하면 나중에 테스트를 작성하게 될 때 용이하다.
```javascript
function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

function* getPostSaga(action) {
    //getPostAPI(postId) 호출을 비동기로 실행한다.
    const response = yield call(getPostAPI, action.payload);
}
```

* all: 미들웨어가 여러개의 이펙트를 병행으로 처리하도록 하고, 모두 끝날 때까지 기다린다. Javascript 표준 API인 [Promise.all](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)과 꽤 비슷하다.
```javascript
export function* rootSaga() {
    yield all([counterSaga(), postSaga()]);
}
```
<br><br>

## 코드 자세히 살펴보기

### modules/counter.js
```javascript
import { /*delay, */put, takeEvery } from 'redux-saga/effects'; // 앞에서 살펴본 이펙트
import { handleActions, createAction } from 'redux-actions';
const INCREMENT = 'INCREMENT'; // 숫자 증가
const DECREMENT = 'DECREMENT'; // 숫자 감소
const INCREMENT_ASYNC = 'INCREMENT_ASYNC'; //숫자 증가 비동기 처리
const DECREMENT_ASYNC = 'DECREMENT_ASYNC'; //숫자 감소 비동기 처리
```
▲ 액션 이름을 정의한 부분이다.
<br>

```javascript
export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);
```
▲ createAction : '액션을 만드는 함수'를 만드는 함수이다. 인자로 액션 type을 넘긴다.<br>
예를 들어서, increment를 호출하면  {type : 'INCREMENT'} 과 같은 action 객체를 리턴한다.

```javascript
function* incrementAsyncSaga() {
    // yield delay(1000);
    // 비즈니스 로직 작성 

    yield put(increment());
}

function* decrementAsyncSaga() {
    // yield delay(1000);
    yield put(decrement());
}
```
▲ put 이펙트는 인자로 액션 객체를 받고, 액션을 dispatch하여 스토어의 state를 변경한다.<br>
put(increment())은 dispatch({type:'INCREMENT'});와 같다.

```javascript
export function* counterSaga() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
    yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}
```
▲ takeEvery 이펙트는 특정 액션이 일어날 때마다 특정 사가를 실행한다.<br>
예를 들어, action: {type: 'INCREMENT_ASYNC'}이 일어났다면 incrementAsyncSaga를 실행한다.

```javascript

// 
const initialState = {
    number: 1
}

export default handleActions(
    {
        [INCREMENT]: (state, action) => {
            return { number: state.number + 1 }
        },
        [DECREMENT]: (state, action) => {
            return { number: state.number - 1 }
        }
    },
    initialState
);
```
▲ handleActions 함수는 액션이 발생해서 사가에서 비즈니스 로직을 모두 처리한 뒤 호출되는 함수이다.<br>
state를 변경할 수 있는 reducer를 정의한다.<br>
액션 타입에 따라서 처리되는 로직을 정의할 수 있다.<br>
인자로 다음과 같이 넘긴다.<br>
```javascript
    {
        "일어날 액션 type": {/*액션이 dispatch되었을 때 수행할 reducer*/}
    },
    {
        "일어날 액션 type2": {/*액션이 dispatch되었을 때 수행할 reducer*/}
    }, 
    /* ... */
```
결국 다음과 같은 reducer를 반환한다.<br>
```javascript
(state, action) => {
    switch(action.type){
        case INCREMENT:
            return { number: state.number + 1 }
        case DECREMENT:
            return { number: state.number - 1 }
    }
    return state;
}
```

### modules/post.js
```javascript
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}
```
▲ axios: http 통신을 위한 모듈이다. Javascript의 fetch 함수와 비슷하다.<br>

```javascript
const GET_POST = 'GET_POST'; // 게시물 가져오기
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'; // 게시물 가져오기 성공
const GET_POST_FAILURE = 'GET_POST_FAILURE'; // 게시물 가져오기 실패

export const getPost = createAction(GET_POST, postId => postId);

function* getPostSaga(action) {
    try {
        const response = yield call(getPostAPI, action.payload);
        yield put({ type: GET_POST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_POST_FAILURE, payload: e });
    }
}
```
▲ getPost함수를 실행하면 'GET_POST' 가 타입인 액션 객체를 만든다.<br>
getPostSaga는 타입이 GET_POST 액션이 시작되면 실행되는 함수로, incrementAsyncSaga()와 마찬가지로 비동기적으로 처리된다.<br>
call 이펙트를 사용해서 getPostApi(postId)를 실행한다. action.payload === postId 이다.<br>
* http 요청 성공 시 GET_POST_SUCCESS 액션이 dispatch된다.<br>
* http 요청 실패(404) 시 catch 블럭이 실행되며 GET_POST_FAILURE 액션이 dispatch된다.
**처리할 비즈니스 로직을 실행한 뒤, 결과를 처리할 액션을 실행하는 것을 볼 수 있다!**

```javascript
// 최초 state의 값
const initialState = {
    data: {
        title: '',
        body: ''
    },
    loading: false,
    error: false
};

export function* postSaga() {
    yield takeEvery(GET_POST, getPostSaga);
}
```
▲ 타입이 GET_POST 액션이 들어올 때마다 getPostSaga 함수를 실행시킨다.

```javascript
export default handleActions(
    {
        [GET_POST]: (state, action) => {
            return {
                loading: true
            };
        },
        [GET_POST_SUCCESS]: (state, action) => {
            const { title, body } = action.payload.data;
            return {
                data: { title, body }
            };
        },
        [GET_POST_FAILURE]: (state, action) => {
            return {
                error: true
            };
        }
    },
    initialState
);
```
▲ handleActions 은 비즈니스 로직(미들 웨어)을 모두 처리한 뒤, state를 변경하기 위한 reducer를 반환한다고 했다. <br>
GET_POST가 실행되면 state.loading을 true로 바꿔서 뷰 단에서 로딩중임을 알릴 수 있다.<br>
게시물을 성공적으로 가져오면 state.data에 게시물 정보를 싣는다.<br>
게시물 가져오기 실패하면 state.error를 true로 만들어 뷰 단에서 오류가 발생했다고 띄울 수 있게 한다.


### modules/index.js
counter, post 사가의 루트 사가이다.<br>
다른 모듈에서 modules 폴더를 import 하면 javascript는 index.js에서 export default된 객체를 찾는다.

```javascript
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';

// 루트 사가
export function* rootSaga() {
    yield all([counterSaga(), postSaga()]);
}
```
▲ rootSaga를 실행하면 all 이펙트를 이용해서 counterSaga()와 postSaga()를 병행으로 실행하며 모두 끝날 때까지 기다린다.

```javascript
export default combineReducers({
    counter, post
})
```
▲ counter, post는 각 모듈의 handleActions()를 import 한 것이고, reducer를 의미한다.<br>
combineReducer를 이용해서 reducer들을 합칠 수 있다.

### src/store.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import modules, { rootSaga } from './modules'; //폴더를 import하면 modules/index.js를 import한 것과 동일
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(modules,
    composeWithDevTools(
        applyMiddleware(logger, sagaMiddleware)
    ));
sagaMiddleware.run(rootSaga);
export default store;
```
▲ createLogger는 redux의 state와 action이 바뀔 때마다 콘솔에 찍는 역할을 한다.<br>
리액트 리덕스는 리덕스 액션 dispatch -> 미들웨어(비즈니스 로직) 실행 -> reducer에서 새로운 state 반환 -> 뷰 재랜더링 순으로 처리된다.<br>
createSagaMiddleware는 사가를 이용한 미들웨어를 만든다.<br>
applyMiddleware는 리덕스에 어떤 미들웨어를 적용할 지 정할 수 있다.<br>
createStore의 첫번째 인자로 본래 reducer가 들어간다. <br>
여기서 modules 객체는 modules/index.js에 있는 combineReducers 함수를 의미하고, combineReducers는 counter, post 모듈의 reducer를 합친 reducer를 반환한다.<br>
composeWithDevTools는 Redux-devtools와 이 앱을 연결할 때 쓴다.<br>
sagaMiddleware.run(rootSaga)를 실행하여 루트 사가를 실행하고, 루트 사가는 counter 사가와 post 사가를 병렬적으로 실행한다.


### src/App.js
```javascript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';
```
▲  counterActions는 counter 모듈의 export된 모든 액션들을 모은 것.<br>
 postActions post 모듈의 export된 모든 액션들을 모은 것.

```javascript
function App(props) {
  const { PostActions, CounterActions, number, post, error, loading } = props;
  useEffect(() => {
    PostActions.getPost(number);
  }, [PostActions, number]); 
```
▲  useEffect는 컴포넌트가 mount 되었을 때, props나 state가 업데이트되었을 때 호출된다.<br>
useEffect의 2번째 인자를 설정해서, PostActions나 number가 변경되었을 때만 호출되도록 설정하였다.<br>
호출될때마다 http 요청으로 게시물 정보를 가져온다.

```javascript
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => CounterActions.incrementAsync()}>+</button>
      <button onClick={() => CounterActions.decrementAsync()}>-</button>
      {loading ? <h2>로딩중...</h2> :
        error ? (
          <h1>에러 발생!</h1>
        ) : (
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          )
      }
    </div>
  );
}
```
▲ 버튼을 누를 때마다 INCREMENT, DECREMENT 액션을 dispatch한다.<br>
그러면 props.number가 바뀌게 된다. 그러면,<br>
props.number를 감시하고 있는 useEffect가 실행되며 번호에 해당하는 게시물을 요청한다.
props.loading, props.error를 이용해서 게시물을 불러오는 중이거나 게시물 불러오기 실패할 경우에 예외 처리할 수 있다.

```javascript
const mapStateToProps = state => {
  return {
    number: state.counter.number,
    post: state.post.data,
    loading: state.post.loading,
    error: state.post.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
```
▲ state의 프로퍼티에 counter와 post가 분리되어있음에 유의하자.<br>
mapStateToProps는 redux의 state가 바뀌면 react의 props도 해당 값으로 변경하는 함수이다.<br>
mapDispatchToProps는 react의 props의 이벤트 리스너가 실행되면 redux의 dispatch를 실행하도록 하는 함수이다.<br>
bindActionCreators는 값이 액션 생산자인 객체를 받아서, 같은 키를 가지지만 각각의 생산자들을 dispatch로 감싸서 바로 호출 가능하게 만든 객체로 바꾼다.


## 데모
https://codesandbox.io/s/181l89z89j?from-embed
