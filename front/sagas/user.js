import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducer/user';
//Login
// function logInAPI() {
//   return axios.post("/api/login");
// }
function* logIn(action) {
  try {
    //call은 동기
    //fork는 비동기
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

//LogOut
// function logOutAPI() {
//   return axios.post("/api/logout");
// }
function* logOut() {
  try {
    //call은 동기
    //fork는 비동기
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

//LogOut
// function signUpAPI() {
//   return axios.post("/api/signUp");
// }
function* signUp() {
  try {
    //call은 동기
    //fork는 비동기
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      //put은 dispatch와 같은 개념이다.
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogIn() {
  //실수로 두번 클릭 방지를 위해 takeLatest로 설정한다.
  //throttle로 연속 방지를 할수있다.(초 제한으로)
  //대부분 takeLatest로 작성한다.
  yield takeLatest(LOG_IN_REQUEST, logIn); //LOG_IN이라는 액션이 실행될때까지 기다리겠다.
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
