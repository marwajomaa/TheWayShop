import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryAPI(token) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories);
    };
    getCategories();
  }, []);

  return {
    categories: [categories, setCategories],
  };
}

export default CategoryAPI;
