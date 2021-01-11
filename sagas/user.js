import { all, fork, takeLatest, put, delay } from "redux-saga/effects";

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
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
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
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  //실수로 두번 클릭 방지를 위해 takeLatest로 설정한다.
  //throttle로 연속 방지를 할수있다.(초 제한으로)
  //대부분 takeLatest로 작성한다.
  yield takeLatest("LOG_IN_REQUEST", logIn); //LOG_IN이라는 액션이 실행될때까지 기다리겠다.
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
