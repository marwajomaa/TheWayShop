import React, { useContext } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { GlobalState } from "../../GlobalState";
import Input from "../../components/Input";
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
}));

const initialValues = {
  product_id: "",
  tittle: "",
  price: 0,
  description: "",
  content: "",
  category: "",
};

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

function CreateProduct() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const { createProduct } = state.productsAPI;
  const { values, handleInputChange, clearInputs } = useForm(
    initialValues,
    false
  );
  const classes = useStyles({});

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
  };

  return (
    <Paper elevation={0}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="h6" component="p">
          Create New Product
        </Typography>
        <Input
          label="Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
        <Input
          label="Price"
          type="number"
          name="price"
          value={values.price}
          onChange={handleInputChange}
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        />
        <Input
          label="Content"
          type="text"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <Select
          name="category"
          label="Category"
          value={values.category}
          onChange={handleInputChange}
          options={categories && categories}
        />
        <Button
          variant="contained"
          color="primary"
          text="Submit"
          type="submit"
          style={{ width: "100%" }}
        />
      </form>
    </Paper>
  );
}

export default CreateProduct;
