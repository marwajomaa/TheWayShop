import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "2rem 0",
  },
  title: {
    flex: 2,
    padding: "2rem 0",
    textAlign: "center",
    fontWeight: "900",
    fontSize: "1.5rem",
  },
  line: {
    flex: 1,
    height: "1px",
    backgroundColor: "#eee",
  },
}));

function Title({ text, variant = "h6", component = "h6", ...props }) {
  const classes = useStyles();
  return (
    <Typography className={classes.root}>
      <Typography className={classes.line} />
      <Typography
        variant={variant}
        component={component}
        {...props}
        className={classes.title}
      >
        {text}
      </Typography>
      <Typography className={classes.line} />
    </Typography>
  );
}

export default Title;
