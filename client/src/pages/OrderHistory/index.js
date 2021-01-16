import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BackLink from "../../components/BackLink";
import { GlobalState } from "../../GlobalState";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  paragraph: {
    textAlign: "center",
    display: "block",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function OrderHistory() {
  const state = useContext(GlobalState);
  const [orderHistory] = state.userAPI.orderHistory;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  function createData(PaymentID, PurchasedAt, View) {
    return { PaymentID, PurchasedAt, View };
  }

  const rows = orderHistory.map((order) => {
    return createData(order.paymentID, order.createdAt, order._id);
  });

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const classes = useStyles();
  if (!orderHistory) return <div>No Orders</div>;

  return (
    <Paper elevation={0}>
      <BackLink />
      <Typography
        variant="h6"
        component="h6"
        style={{ textAlign: "center", margin: "30px auto" }}
      >
        {isAdmin
          ? `Orders History: ${rows.length} orders`
          : `You have ${rows.length} orders`}
      </Typography>
      {rows.length !== 0 && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>PaymentID</StyledTableCell>
                <StyledTableCell>Date Of Purchased</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.PaymentID}>
                  <StyledTableCell>{row.PaymentID}</StyledTableCell>
                  <StyledTableCell>
                    <Moment format="DD/MM/YYYY" date={row.PurchasedAt} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link to={`/history/${row.View}`}>
                      <ArrowForwardIcon />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default OrderHistory;
