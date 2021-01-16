import React, { useContext } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { GlobalState } from "../../GlobalState";
import Input from "../../components/Input";
import BackLink from "../../components/BackLink";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { useForm } from "../../hooks/useForm";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "1rem auto",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  paragraph: {
    margin: "10px 0",
    padding: "10px",
  },
}));

const initialValues = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
};

function CreateProduct() {
  const classes = useStyles({});
  const history = useHistory();
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const { createProduct } = state.productsAPI;
  const [callback, setCallback] = state.productsAPI.callback;
  const { values, handleInputChange, clearInputs, setData } = useForm(
    initialValues,
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      product_id: Math.random(),
      title: values.title,
      description: values.description,
      content: values.content,
      category: values.category,
      price: values.price,
    };

    await createProduct(product);
    history.push("/");
    setCallback(!callback);
  };

  return (
    <Paper elevation={0}>
      <BackLink />
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="h6" component="p" className={classes.paragraph}>
          Create New Product
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Title"
              type="text"
              name="title"
              value={values.title || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Price"
              type="number"
              name="price"
              value={values.price || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Description"
              type="text"
              name="description"
              value={values.description || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Content"
              type="text"
              name="content"
              value={values.content || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="category"
              label="Category"
              value={values.category || ""}
              onChange={handleInputChange}
              options={categories && categories}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              text="Submit"
              type="submit"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default CreateProduct;
