import { createSelector } from "reselect";

const selectAppState = state => state.app;

const selectRepoList = createSelector(
  selectAppState,
  substate => substate.get("repoList")
);

const selectLoading = createSelector(
  selectAppState,
  substate => substate.get("loading")
);

const selectError = createSelector(
  selectAppState,
  substate => substate.get("error")
);

const selectUsername = createSelector(
  selectAppState,
  substate => substate.get("userName")
);

const selectCurrentPage = createSelector(
  selectAppState,
  substate => substate.get("currentPage")
);

const selectCanLoadMore = createSelector(
  selectAppState,
  substate => substate.get("canLoadMore")
);

const selectTotalRepos = createSelector(
  selectAppState,
  substate => substate.get("totalRepos")
);

export {
  selectRepoList,
  selectLoading,
  selectError,
  selectUsername,
  selectCurrentPage,
  selectCanLoadMore,
  selectTotalRepos
};
