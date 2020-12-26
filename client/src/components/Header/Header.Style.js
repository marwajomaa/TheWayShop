import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingRight: "79px",
    paddingLeft: "118px",
    color: "red",
    "@media (max-width: 900px)": {
      padding: 0,
      paddingRight: "10px",
      width: "100%",
    },
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "red",
  },
  drawerContainer: {
    padding: "20px 30px",
    color: "red",
  },
}));
