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
            console.log('post::handleActions(GET_POST) 호출됨: ', { state, action });
            return {
                loading: true
            };
        },
        [GET_POST_SUCCESS]: (state, action) => {
            const { title, body } = action.payload.data;
            console.log('post::handleActions(GET_POST_SUCCESS) 호출됨: ', { state, action });
            return {
                data: { title, body }
            };
        },
        [GET_POST_FAILURE]: (state, action) => {
            console.log('post::handleActions(GET_POST_FAILURE) 호출됨: ', { state, action });
            return {
                error: true
            };
        }
    },
    initialState
);