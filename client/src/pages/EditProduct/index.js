import React, { useState, useEffect, useContext } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Select from "../../components/Select";

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

function EditProduct() {
  const classes = useStyles({});
  const params = useParams();
  const history = useHistory();
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const { editProduct } = state.productsAPI;
  const [product, setProduct] = useState(initialValues);

  useEffect(() => {
    if (params.id) {
      if (!isAdmin) alert("You are not an admin");

      products.forEach((product) => {
        if (product._id === params.id) {
          setProduct(product);
        }
      });
    }
  }, [params.id, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      const newProduct = {
        product_id: product._id,
        title: product.title,
        description: product.description,
        content: product.content,
        category: product.category,
        price: product.price,
      };

      await editProduct(product._id, newProduct);
      history.push("/");
    }
  };

  if (!product) {
    return <Loading />;
  }
  return (
    <Paper elevation={0}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="h6" component="p" className={classes.paragraph}>
          Edit Product
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Input
              id="Title"
              label="Title"
              initialValue={product.title}
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="Price"
              label="Price"
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="Description"
              label="Description"
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="Content"
              label="Content"
              type="text"
              name="content"
              value={product.content}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="category"
              label="Category"
              value={product.category}
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

export default EditProduct;
