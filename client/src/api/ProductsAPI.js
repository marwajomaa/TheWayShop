import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/products?limit=${
            page * 9
          }&${category}&${sort}&title[regex]=${search}`
        );
        setProducts(res.data.products);
        setResult(res.data.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");
      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    setAlert("Are you sure you want to delete this product");
    try {
      setLoading(true);
      await axios.delete(`/api/products/product/${id}`);
      window.location.href = "/";
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const createProduct = async (product) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/products", product);
      setAlert(res.data.msg);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const editProduct = async (id, product) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/api/products/product/${id}`, product);
      setLoading(false);
      setAlert(res.data.msg);
    } catch (err) {
      setError(err.message);
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
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    alert: [alert, setAlert],
    loading: [loading, setLoading],
    success: [success, setSuccess],
    error: [error, setError],
  };
}

export default ProductsAPI;
