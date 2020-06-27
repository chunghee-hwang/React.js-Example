import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

function App(props) {
  const { PostActions, CounterActions, number, post, error, loading } = props;
  useEffect(() => {
    PostActions.getPost(number);
    console.log('useEffect 실행됨');
  }, [PostActions, number]); // props.PostActions, props.number가 다를 경우에만 useEffect 재실행하기

  console.log('App::render() - props:', props);
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
