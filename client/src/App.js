import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, Paper, makeStyles } from "@material-ui/core";
import { DataProvider } from "./GlobalState";
import Header from "./components/Header";
import Pages from "./pages";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    margin: "0 auto",
  },
  main: {
    marginTop: "125px",
    minHeight: "100vh",
    width: "100%",
  },
}));

function App() {
  const classes = useStyle();
  return (
    <DataProvider>
      <Router>
        <CssBaseline />
        <Paper elevation={0} className={classes.root}>
          <Header />
          <Pages style={classes.main} />
        </Paper>
      </Router>
    </DataProvider>
  );
}

export default App;
