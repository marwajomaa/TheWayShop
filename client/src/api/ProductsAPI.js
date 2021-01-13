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
    history.push("/");
  };

  const createProduct = async (product) => {
    try {
      const res = await axios.post("/api/products", product);
      alert(res.data.msg);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const editProduct = async (id, product) => {
    try {
      const res = await axios.patch(`/api/products/product/${id}`, product);
      history.push("/");
      // alert(res.data.msg);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
    deleteProduct,
    createProduct,
    editProduct,
  };
}

export default ProductsAPI;
