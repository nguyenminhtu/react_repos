import { fork, all, call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";

import {
  DEFAULT_GITHUB_URL,
  DEFAULT_PARAMS,
  DEFAULT_PER_PAGE,
  GET_REPOS,
  GET_MORE_REPO,
  GET_STARGAZERS,
  GET_MORE_STARGAZER
} from "./constants";
import {
  getRepoSuccess,
  getRepoFail,
  getStargazerSuccess,
  getStargazerFail
} from "./actions";
import { selectUsername, selectCurrentPage } from "./selectors";

const requestGetRepos = (userName, currentPage) => {
  return axios.get(
    `${DEFAULT_GITHUB_URL}/search/repositories?q=user:${userName}&page=${currentPage}&per_page=${DEFAULT_PER_PAGE}&${DEFAULT_PARAMS}`
  );
};

const requestGetStargazers = (currentPage, stargazersUrl) => {
  return axios.get(
    `${stargazersUrl}?page=${currentPage}&per_page=${DEFAULT_PER_PAGE}&${DEFAULT_PARAMS}`
  );
};

function* getReposSaga() {
  try {
    const userName = yield select(selectUsername);
    const currentPage = yield select(selectCurrentPage);
    const response = yield call(requestGetRepos, userName, currentPage);
    yield put(getRepoSuccess(response.data));
  } catch (err) {
    yield put(getRepoFail(err.toString()));
  }
}

function* getStargazersSaga(action) {
  try {
    const { repo } = action;
    const { currentPage, stargazersUrl } = repo;
    const response = yield call(
      requestGetStargazers,
      currentPage,
      stargazersUrl
    );
    yield put(getStargazerSuccess(repo, response.data));
  } catch (err) {
    yield put(getStargazerFail(err.toString()));
  }
}

function* getRepoWatcher() {
  yield takeLatest(GET_REPOS, getReposSaga);
}

function* getMoreRepoWatcher() {
  yield takeLatest(GET_MORE_REPO, getReposSaga);
}

function* getStargazerWatcher() {
  yield takeLatest(GET_STARGAZERS, getStargazersSaga);
}

function* getMoreStargazerWatcher() {
  yield takeLatest(GET_MORE_STARGAZER, getStargazersSaga);
}

export default function* watchSagas() {
  yield all([
    fork(getRepoWatcher),
    fork(getMoreRepoWatcher),
    fork(getStargazerWatcher),
    fork(getMoreStargazerWatcher)
  ]);
}
