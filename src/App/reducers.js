import { fromJS, List } from "immutable";

import {
  GET_REPOS,
  GET_REPO_SUCCESS,
  GET_REPO_FAIL,
  CHANGE_USERNAME,
  DEFAULT_PER_PAGE,
  GET_MORE_REPO,
  GET_STARGAZERS,
  GET_STARGAZER_SUCCESS,
  GET_STARGAZER_FAIL,
  GET_MORE_STARGAZER
} from "./constants";

const initialState = fromJS({
  userName: "",
  repoList: [],
  loading: false,
  error: false,
  totalRepos: false,
  currentPage: 1,
  canLoadMore: false
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set("userName", action.userName);
    case GET_REPOS:
      return state
        .set("error", false)
        .set("loading", true)
        .set("currentPage", 1)
        .set("repoList", List([]))
        .set("totalRepos", false)
        .set("canLoadMore", false);
    case GET_REPO_SUCCESS:
      let { items: newRepoList, total_count } = action.data;
      newRepoList = newRepoList.map(repo => ({
        name: repo.name,
        stagazersCount: repo.stargazers_count,
        stargazersUrl: repo.stargazers_url,
        stargazerList: [],
        currentPage: 1,
        canLoadMore: repo.stargazers_count > DEFAULT_PER_PAGE ? true : false
      }));
      const oldRepoList = state.get("repoList");
      const totalPage = Math.ceil(total_count / DEFAULT_PER_PAGE);
      const oldCurrentPage = state.get("currentPage");
      const canLoadMore = totalPage > oldCurrentPage ? true : false;
      return state
        .set("repoList", List(oldRepoList.concat(newRepoList)))
        .set("totalRepos", total_count)
        .set("loading", false)
        .set("canLoadMore", canLoadMore);
    case GET_REPO_FAIL:
      return state.set("loading", false).set("error", action.error);
    case GET_MORE_REPO:
      return state
        .set("loading", true)
        .set("currentPage", state.get("currentPage") + 1);
    case GET_STARGAZERS:
      const { repo: repoGetStagazer } = action;
      const newRepoGetStargazer = Object.assign(repoGetStagazer, {
        stargazerList: [],
        currentPage: 1
      });
      return state
        .set("loading", true)
        .setIn(["repoList", "id", repoGetStagazer.id], newRepoGetStargazer);
    case GET_STARGAZER_SUCCESS:
      const { repo: repoGetStargazerSuccess, data } = action;
      const totalStagazerPage = Math.ceil(
        repoGetStargazerSuccess.stagazersCount / DEFAULT_PER_PAGE
      );
      const newCanLoadMore =
        repoGetStargazerSuccess.currentPage >= totalStagazerPage ? false : true;
      const newStargazerList = repoGetStargazerSuccess.stargazerList.concat(
        data
      );
      const newRepo = Object.assign(repoGetStargazerSuccess, {
        stargazerList: newStargazerList,
        canLoadMore: newCanLoadMore
      });
      return state
        .setIn(["repoList", "id", repoGetStargazerSuccess.id], newRepo)
        .set("loading", false);
    case GET_STARGAZER_FAIL:
      return state.set("loading", false);
    case GET_MORE_STARGAZER:
      const { repo: repoGetMoreStargazer } = action;
      const newCurrentPage = repoGetMoreStargazer.currentPage + 1;
      const newRepoSelected = Object.assign(repoGetMoreStargazer, {
        currentPage: newCurrentPage
      });
      return state
        .set("loading", true)
        .setIn(["repoList", "id", repoGetMoreStargazer.id], newRepoSelected);
    default:
      return state;
  }
};

export default appReducer;
