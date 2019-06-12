import React, { memo } from "react";

const InputForm = memo(({ userName, changeUsername, getRepos, loading }) => {
  return (
    <>
      <p>
        <input
          type="text"
          value={userName}
          onChange={e => changeUsername(e.target.value)}
        />
        <button
          onClick={() => getRepos()}
          disabled={loading ? "disabled" : null}
        >
          {loading ? "Loading..." : "Get repos"}
        </button>
      </p>
    </>
  );
});

export default InputForm;
