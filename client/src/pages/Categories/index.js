import React, { useState, useContext } from "react";
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
  Typography: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
  },
  box: {
    margin: "1.5rem auto",
    border: "1px solid #eee",
    maxWidth: "350px",
    boxShadow: "1px 1px 1px #eee",
  },
}));

function Categories() {
  const state = useContext(GlobalState);
  const { values, handleInputChange } = useForm(initialValues, false);
  const [categories] = state.categoryAPI.categories;
  const createCategory = state.categoryAPI;
  const [category, setCategory] = useState("");
  const classes = useStyles();
  console.log(typeof categories, "----------------");

  return (
    <Paper elevation={0}>
      <form onSubmit={createCategory} className={classes.container}>
        <Grid container xs={12} direction="column" spacing={2}>
          <Grid item xs={12}>
            <Input
              label="Add New Category"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              text="Add Category"
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
          categories.map((category) => (
            <Grid className={classes.box}>
              <Typography key={category.name} variant="h5" component="span">
                {category.name}
              </Typography>
              <ButtonGroup style={{ margin: "1rem auto" }}>
                <Button
                  text="Edit"
                  variant="contained"
                  color="primary"
                  style={{
                    alignSelf: "center",
                    width: "100%",
                    margin: "0 1rem",
                  }}
                />
                <Button
                  text="Delete"
                  type="outlined"
                  color="secondary"
                  style={{ alignSelf: "center", width: "100%" }}
                />
              </ButtonGroup>
            </Grid>
          ))}
      </Box>
    </Paper>
  );
}

export default Categories;
