import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
export default function Select(props) {
  const classes = useStyles();
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    allProducts,
  } = props;

  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      className={classes.root}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        {allProducts && <MenuItem value="">All Products</MenuItem>}
        {options.map((item) => (
          <MenuItem key={item._id} value={item.value || item.name}>
            {item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
