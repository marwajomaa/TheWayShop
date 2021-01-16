import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Box,
  ButtonGroup,
} from "@material-ui/core";
import { GlobalState } from "../../GlobalState";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BackLink from "../../components/BackLink";

const initialValues = {
  category: "",
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "1rem auto",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    display: "inline-block",
    width: "30%",
    fontSize: "1.2rem",
    padding: "0 5px",
  },
  box: {
    width: "100%",
    margin: "1.5rem auto",
    border: "1px solid #eee",
    maxWidth: "350px",
    boxShadow: "1px 1px 1px #eee",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
}));

function Categories() {
  const state = useContext(GlobalState);
  const { values, handleInputChange } = useForm(initialValues, false);
  const [categories] = state.categoryAPI.categories;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [token] = state.token;
  // const { createCategory } = state.categoryAPI;
  const [category, setCategory] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const classes = useStyles();

  const onEditCategory = (_id, name) => {
    setCategory(name);
    setID(_id);
    setOnEdit(true);
    setTimeout(() => console.log(onEdit), 4000);
  };

  const createCategory = async () => {
    try {
      if (onEdit) {
        const res = await axios.patch(
          `/api/categories/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/categories/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert(res.data.msg);
      }
      setCallback(!callback);
      setOnEdit(false);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/categories/category/${id}`);
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Paper elevation={0}>
      <BackLink />
      <form onSubmit={createCategory} className={classes.container}>
        <Grid container xs={12} direction="column" spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Add New Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              text={onEdit ? "Update" : "Add Category"}
              type="outlined"
              color="primary"
              style={{ alignSelf: "center", width: "100%" }}
            />
          </Grid>
        </Grid>
      </form>
      <Box style={{ textAlign: "center", margin: "2rem auto" }}>
        <Typography variant="h4">Categories</Typography>
        {categories &&
          categories.map(({ name, _id }) => (
            <Grid className={classes.box}>
              <Typography
                key={name}
                variant="h5"
                component="span"
                className={classes.typography}
              >
                {name}
              </Typography>
              <ButtonGroup style={{ margin: "1rem auto" }}>
                <Button
                  text="Edit"
                  variant="contained"
                  style={{
                    alignSelf: "center",
                    width: "100%",
                    margin: "0 1rem",
                  }}
                  onClick={() => onEditCategory(_id, name)}
                />
                <Button
                  text="Delete"
                  type="outlined"
                  color="secondary"
                  style={{ alignSelf: "center", width: "100%" }}
                  onClick={() => deleteCategory(_id)}
                />
              </ButtonGroup>
            </Grid>
          ))}
      </Box>
    </Paper>
  );
}

export default Categories;
