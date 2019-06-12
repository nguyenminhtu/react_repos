import React, { memo } from "react";

const Error = memo(({ error }) => {
  return <>{error && <p>User not found</p>}</>;
});

export default Error;
