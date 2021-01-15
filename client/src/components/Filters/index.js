import React, { useContext, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { GlobalState } from "../../GlobalState";
import Select from "../../components/Select";
import Input from "../../components/Input";

function Filters() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoryAPI.categories;

  const [products, setProducts] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [isAdmin] = state.userAPI.isAdmin;

  const handleInputChange = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  const categoriesOptions = categories.map((category) => {
    return {
      _id: category._id,
      value: "category=" + category._id,
      name: category.name,
    };
  });

  const sortOptions = [
    { _id: "1", value: "", name: "Newest" },
    { _id: "2", value: "sort=oldest", name: "Oldest" },
    { _id: "3", value: "sort=-sold", name: "Best sales" },
    { _id: "4", value: "sort=-price", name: "Price: Hight-Low" },
    { _id: "5", value: "sort=price", name: "Price: Low-Hight" },
  ];

  return (
    <Grid container xs={12} style={{ padding: "1rem" }}>
      {isAdmin && (
        <>
          {/* <Grid item xs={6}> */}
          {/* <Typography variant="h6" component="span">
              Filters:
            </Typography>
            <Select
              name="category"
              value={category}
              onChange={handleInputChange}
              options={categoriesOptions}
              allProducts
            /> */}
          {/* <Input
              placeholder="Enter your search"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            /> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={3}>
            <Typography variant="p" component="span">
              Sort By:
            </Typography>
            <Select
              name="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={sortOptions}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Filters;
