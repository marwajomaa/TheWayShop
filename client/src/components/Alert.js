import React from "react";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

function Alert({ title, text, type }) {
  return (
    <>
      <MuiAlert severity={type} style={{ width: "100%" }}>
        <AlertTitle>{title || ""}</AlertTitle>
        {text}
      </MuiAlert>
    </>
  );
}

export default Alert;
