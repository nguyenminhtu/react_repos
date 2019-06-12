import {
  GET_REPOS,
  GET_REPO_SUCCESS,
  GET_REPO_FAIL,
  CHANGE_USERNAME,
  GET_MORE_REPO,
  GET_STARGAZERS,
  GET_STARGAZER_SUCCESS,
  GET_STARGAZER_FAIL,
  GET_MORE_STARGAZER
} from "./constants";

export const changeUsername = userName => ({
  type: CHANGE_USERNAME,
  userName
});

export const getRepos = () => ({
  type: GET_REPOS
});

export const getRepoSuccess = data => ({
  type: GET_REPO_SUCCESS,
  data
});

export const getRepoFail = error => ({
  type: GET_REPO_FAIL,
  error
});

export const getMoreRepos = () => ({
  type: GET_MORE_REPO
});

export const getStargazers = repo => ({
  type: GET_STARGAZERS,
  repo
});

export const getStargazerSuccess = (repo, data) => ({
  type: GET_STARGAZER_SUCCESS,
  repo,
  data
});

export const getStargazerFail = error => ({
  type: GET_STARGAZER_FAIL,
  error
});

export const getMoreStargazer = repo => ({
  type: GET_MORE_STARGAZER,
  repo
});
