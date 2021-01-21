import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";
import axios from "axios";

axios.defaults.baseURL = "http://localhostL3065";

export default function* rootSaga() {
    //all은 배열안에 있는 fork를 한번에 실행시켜준다.
    //fork는 함수를 실행시켜주는 함수(call과 차이점 알아두기)
    yield all([fork(postSaga), fork(userSaga)]);
}
