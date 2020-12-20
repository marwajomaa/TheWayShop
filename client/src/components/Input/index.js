import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, value, label, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
