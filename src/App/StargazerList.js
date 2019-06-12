import React, { memo } from "react";

const StargazerList = memo(({ repo, getMoreStargazer, loading }) => {
  return (
    <>
      {repo.stargazerList.map(stargazer => {
        return (
          <li
            style={{ marginLeft: "40px", listStyleType: "circle" }}
            key={stargazer.id}
          >
            {stargazer.login}
          </li>
        );
      })}
      {repo.canLoadMore && repo.stargazerList.length > 0 && (
        <button
          onClick={() => getMoreStargazer(repo)}
          disabled={loading ? "disabled" : null}
          style={{ marginLeft: "40px" }}
        >
          {loading ? "Loading..." : "Load more stargazers"}
        </button>
      )}
    </>
  );
});

export default StargazerList;
