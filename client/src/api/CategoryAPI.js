import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryAPI(token) {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories);
    };
    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    // createCategory,
    callback: [callback, setCallback],
  };
}

export default CategoryAPI;
