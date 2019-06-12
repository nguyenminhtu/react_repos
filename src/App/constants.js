export const GET_REPOS = "app/GET_REPOS";
export const GET_REPO_SUCCESS = "app/GET_REPO_SUCCESS";
export const GET_REPO_FAIL = "app/GET_REPO_FAIL";

export const GET_MORE_REPO = "app/GET_MORE_REPO";
export const GET_MORE_REPO_SUCCESS = "app/GET_MORE_REPO_SUCCESS";
export const GET_MORE_REPO_FAIL = "app/GET_MORE_REPO_FAIL";

export const GET_MORE_STARGAZER = "app/GET_MORE_STARGAZER";

export const GET_STARGAZERS = "app/GET_STARGAZERS";
export const GET_STARGAZER_SUCCESS = "app/GET_STARGAZER_SUCCESS";
export const GET_STARGAZER_FAIL = "app/GET_STARGAZER_FAIL";

export const CHANGE_USERNAME = "app/CHANGE_USERNAME";

export const DEFAULT_PER_PAGE = 30;
export const DEFAULT_GITHUB_URL = "https://api.github.com";
export const DEFAULT_PARAMS = `client_id=${
  process.env.REACT_APP_CLIENT_ID
}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`;
