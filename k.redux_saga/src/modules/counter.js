import { /*delay, */put, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';

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

// 결과적으로 counter 모듈의 reducer를 반환한다.
export default handleActions(
    {
        [INCREMENT]: (state, action) => {
            console.log('counter::handleActions 실행됨(INCREMENT):', { state, action })
            return { number: state.number + 1 }
        },
        [DECREMENT]: (state, action) => {
            console.log('counter::handleActions 실행됨(DECREMENT):', { state, action })
            return { number: state.number - 1 }
        }
    },
    initialState
);