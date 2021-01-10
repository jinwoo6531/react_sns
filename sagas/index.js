import { all, fork, take, call, put } from 'redux-saga/effects';
import axios from 'axios';

//Login
function logInAPI() {
  return axios.post('/api/login');
}
function* logIn(action) {
  try {
    //call은 동기
    //fork는 비동기
    const result = yield call(logInAPI, action.data);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: error.response.data,
    });
  }
}

//LogOut
function logOutAPI() {
  return axios.post('/api/logout');
}
function* logOut() {
  try {
    //call은 동기
    //fork는 비동기
    const result = yield call(logOutAPI);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    });
  }
}

//addPost
function addPostAPI(data) {
  return axios.post('/api/addPost', data);
}
function* addPost() {
  try {
    //call은 동기
    //fork는 비동기
    const result = yield call(addPostAPI, action.data);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn); //LOG_IN이라는 액션이 실행될때까지 기다리겠다.
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  //all은 배열안에 있는 fork를 한번에 실행시켜준다.
  //fork는 함수를 실행시켜주는 함수(call과 차이점 알아두기)
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
