import React, { memo } from "react";

import StargazerList from "./StargazerList";

const RepoList = memo(
  ({
    error,
    totalRepos,
    repoList,
    canLoadMore,
    loading,
    getMoreRepos,
    getStargazers,
    getMoreStargazer
  }) => {
    const renderStargazers = repo => {
      return (
        <>
          Stargazers count: {repo.stagazersCount}
          {(repo.stagazersCount > 0 || repo.canLoadMore) && (
            <button
              onClick={() => getStargazers(repo)}
              disabled={loading ? "disabled" : null}
            >
              {loading ? "Loading..." : "Load stargazers"}
            </button>
          )}
          <StargazerList
            key={`${repo.id}-${repo.id}`}
            repo={repo}
            getMoreStargazer={getMoreStargazer}
            loading={loading}
          />
        </>
      );
    };
    return (
      <>
        <p>
          <span>
            {!error && totalRepos && `Total public repos: ${totalRepos}`}
          </span>
          <span style={{ marginLeft: "50px" }}>
            {!error && repoList.size > 0 && `Repo loaded: ${repoList.size}`}
          </span>
        </p>
        <ul>
          {!error &&
            repoList.map((repo, index) => {
              return (
                <li
                  key={`${repo.id}-${index}`}
                  style={{
                    lineHeight: "35px",
                    borderBottom: "1px solid black"
                  }}
                >
                  {repo.name}
                  {renderStargazers(repo)}
                </li>
              );
            })}
        </ul>
        <hr />
        {!error && canLoadMore && (
          <button
            onClick={() => getMoreRepos()}
            disabled={loading ? "disabled" : null}
          >
            {loading ? "Loading..." : "Load more repos"}
          </button>
        )}
      </>
    );
  }
);

export default RepoList;
