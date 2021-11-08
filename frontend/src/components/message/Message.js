import React from "react";
import { Alert } from "react-bootstrap";

// message for alerts
function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Message;
