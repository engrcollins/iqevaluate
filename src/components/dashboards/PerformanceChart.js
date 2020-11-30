import React from "react";

const LiveChat = ({ match }) => {
  sessionStorage.setItem("navigate", match.url);

  return (
    <div>
      <h1>Coming soon</h1>
    </div>
  );
};

export default LiveChat;
