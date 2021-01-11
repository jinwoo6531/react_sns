import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
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
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
