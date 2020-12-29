import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { TableCell, TableRow } from "@material-ui/core";
import { GlobalState } from "../../GlobalState";
import Loading from "../../components/Loading";
import Table from "../../components/Table";

function OrderDetails() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [orderHistory] = state.userAPI.orderHistory;
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (params.id) {
      console.log(params.id, "params");
      orderHistory.forEach((item) => {
        if (item._id === params.id) setOrderDetails([item]);
      });
    }
  }, [params.id, orderHistory]);

  let rows, cartRows;
  if (orderDetails.length !== 0) {
    function createData(Name, PostalCode, CountryCode, Email) {
      return { Name, PostalCode, CountryCode, Email };
    }

    rows = orderDetails.map((order) => {
      return createData(
        order.name,
        order.address.postal_code,
        order.address.country_code,
        order.email
      );
    });

    function createCartData(Products, Quantity, Price, Sold) {
      return { Products, Quantity, Price, Sold };
    }

    const cart = orderDetails.map((item) => {
      return item.cart;
    });

    cartRows = cart.map((item) => {
      return createCartData(
        item.category,
        item.quantity,
        item.price,
        item.sold
      );
    });
  }
  const paymentTable = ["Name", "Country Code", "Postal Code", "Email"];
  const cartTable = ["Products", "Quantity", "Price", "Sold"];

  if (!orderDetails) return <Loading />;
  return (
    <>
      <Table HeadData={paymentTable} rows={rows} addressDetails />
      {/* <Table HeadData={cartTable} cartRows={cartRows} cartDetails /> */}
    </>
  );
}

export default OrderDetails;
