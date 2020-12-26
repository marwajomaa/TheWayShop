import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function ProductsAPI() {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/api/products/product/${id}`);
    alert("product deleted successfully");
    // history.push("/");
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    deleteProduct,
  };
}

export default ProductsAPI;
