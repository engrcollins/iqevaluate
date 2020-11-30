import React from "react";

const Instruction = ({ match }) => {
  const instruction = sessionStorage.getItem("inst");
  return (
    <div>
      <p>{match.url}</p>
      {instruction ? (
        <div dangerouslySetInnerHTML={{ __html: instruction }} />
      ) : null}
    </div>
  );
};

export default Instruction;
