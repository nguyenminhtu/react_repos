import React, { memo } from "react";
import { connect } from "react-redux";

import {
  selectRepoList,
  selectLoading,
  selectError,
  selectUsername,
  selectCanLoadMore,
  selectTotalRepos
} from "./selectors";
import {
  getRepos as getReposAction,
  changeUsername as changeUsernameAction,
  getMoreRepos as getMoreReposAction,
  getStargazers as getStargazersAction,
  getMoreStargazer as getMoreStargazerAction
} from "./actions";

import RepoList from "./RepoList";
import InputForm from "./InputForm";
import Error from "./Error";

const App = memo(
  ({
    repoList,
    loading,
    getRepos,
    userName,
    changeUsername,
    canLoadMore,
    getMoreRepos,
    totalRepos,
    error,
    getStargazers,
    getMoreStargazer
  }) => {
    return (
      <>
        <InputForm
          getRepos={getRepos}
          loading={loading}
          userName={userName}
          changeUsername={changeUsername}
        />
        <RepoList
          loading={loading}
          repoList={repoList}
          canLoadMore={canLoadMore}
          getMoreRepos={getMoreRepos}
          totalRepos={totalRepos}
          error={error}
          getStargazers={getStargazers}
          getMoreStargazer={getMoreStargazer}
        />
        <Error error={error} />
      </>
    );
  }
);

const mapStateToProps = state => ({
  loading: selectLoading(state),
  error: selectError(state),
  repoList: selectRepoList(state),
  userName: selectUsername(state),
  canLoadMore: selectCanLoadMore(state),
  totalRepos: selectTotalRepos(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  getRepos: () => dispatch(getReposAction()),
  getMoreRepos: () => dispatch(getMoreReposAction()),
  getStargazers: repo => dispatch(getStargazersAction(repo)),
  getMoreStargazer: repo => dispatch(getMoreStargazerAction(repo)),
  changeUsername: userName => dispatch(changeUsernameAction(userName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
