import React from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackLink() {
  const history = useHistory();
  return (
    <Link
      onClick={() => history.goBack()}
      style={{
        margin: "1rem 0",
        color: "darkblue",
        display: "flex",
        textAlign: "center",
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      <ArrowBackIcon />
      Go Back
    </Link>
  );
}

export default BackLink;
