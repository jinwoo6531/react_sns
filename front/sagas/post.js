import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
} from '../reducer/post';

//addPost
// function addPostAPI(data) {
//   return axios.post("/api/addPost", data);
// }
function* addPost() {
  try {
    //call은 동기
    //fork는 비동기
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: ADD_POST_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

//addComment
// function addCommentAPI(data) {
//   return axios.post(`/api/post/${data.postId}/comment`, data);
// }
function* addComment(action) {
  try {
    //call은 동기
    //fork는 비동기
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: ADD_COMMENT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
