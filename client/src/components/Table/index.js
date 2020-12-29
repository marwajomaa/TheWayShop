import React from "react";
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
} from "@material-ui/core";
import Loading from "../../components/Loading";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    margin: "20px auto",
  },
});

export default function CustomizedTables({
  rows,
  HeadData,
  addressDetails,
  cartRows,
}) {
  const classes = useStyles();
  if (!rows) return <Loading />;

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {HeadData.map((item) => {
              return <StyledTableCell key={item}>{item}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {addressDetails &&
            rows.map((row) => (
              <StyledTableRow key={row.Name}>
                <StyledTableCell>{row.Name}</StyledTableCell>
                <StyledTableCell>{row.CountryCode}</StyledTableCell>
                <StyledTableCell>{row.PostalCode}</StyledTableCell>
                <StyledTableCell>{row.Email}</StyledTableCell>
              </StyledTableRow>
            ))}
          {cartRows &&
            cartRows.map((row) => (
              <StyledTableRow key={row.Products}>
                <StyledTableCell>{row.Products}</StyledTableCell>
                <StyledTableCell>{row.Quantity}</StyledTableCell>
                <StyledTableCell>{row.Price}</StyledTableCell>
                <StyledTableCell>{row.Sold}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
