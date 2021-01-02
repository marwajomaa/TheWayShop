import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryAPI(token) {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createCategory = async (category) => {
    try {
      const res = await axios.post(
        "/api/categories/category",
        { name: category },
        {
          headers: { Authorization: token },
        }
      );
      getCategories();
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return {
    categories: [categories, setCategories],
    createCategory,
  };
}

export default CategoryAPI;
