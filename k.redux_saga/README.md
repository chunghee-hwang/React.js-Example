# 리덕스 사가

이 레포지토리는 [리덕스 미들웨어와 외부 데이터 연동](https://redux-advanced.vlpt.us/2/05.html) 튜토리얼을 참고했습니다.

## 리덕트 사가란?
> redux-saga 는 비동기작업처럼, 리듀서에서 처리하면 안되는 순수하지 않은 작업들을 하기 위한 리덕스 [미들웨어](https://redux-advanced.vlpt.us/1/01.html)입니다.

redux-thunk 의 경우 함수를 dispatch 해주었고, reduix-promise-middleware 나 redux-pender 에선 Promise 가 들어있는 액션을 dispatch 해주었다면, redux-saga 에서는 일반 액션을 dispatch 하게 됩니다.

그리고, 특정 액션이 발생하면 이를 모니터링 하여 이에 기반하여 추가적인 작업을 하도록 설계합니다.

redux-saga 에서는 [Generator](https://wonism.github.io/javascript-generator/) 라는 것을 사용해서 function* 같은 문법을 사용하게 됩니다.


## 모듈 설치
```bash
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

* all: Creates an Effect description that instructs the middleware to run multiple Effects in parallel and wait for all of them to complete. It's quite the corresponding API to standard Promise#all.
미들웨어가 여러개의 이펙트를 병행으로 처리하도록 하고, 
```javascript

```

## 코드 자세히 살펴보기

### modules/counter.js
```javascript
import { /*delay, */put, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';
```
* comment
```javascript
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);

function* incrementAsyncSaga() {
    // yield delay(1000);
    yield put(increment());
}

function* decrementAsyncSaga() {
    // yield delay(1000);
    yield put(decrement());
}

export function* counterSaga() {
    yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
    yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

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

### modules/post.js
```javascript
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = createAction(GET_POST, postId => postId);

function* getPostSaga(action) {
    try {
        const response = yield call(getPostAPI, action.payload);
        yield put({ type: GET_POST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_POST_FAILURE, payload: e });
    }
}

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

### modules/index.js
```javascript
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';

// 루트 사가
export function* rootSaga() {
    yield all([counterSaga(), postSaga()]);
}

export default combineReducers({
    counter, post
})
```

### src/store.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import modules, { rootSaga } from './modules';
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(modules,
    composeWithDevTools(
        applyMiddleware(logger, sagaMiddleware)
    ));
sagaMiddleware.run(rootSaga);
export default store;
```

### src/App.js
```javascript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

function App(props) {
  const { PostActions, CounterActions, number, post, error, loading } = props;
  useEffect(() => {
    PostActions.getPost(number);
  }, [PostActions, number]); 

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


## 데모
https://codesandbox.io/s/181l89z89j?from-embed
