import React, { useContext } from "react";
import { makeStyles, Checkbox } from "@material-ui/core";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import img from "../../assets/img.jpg";
import Button from "../Button";
import { GlobalState } from "../../GlobalState";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 300,
    margin: "0 auto",
    padding: "10px",
  },
  media: {
    height: 200,
  },
});

export default function MediaCard({ product, handleCheck }) {
  const globalState = useContext(GlobalState);
  const [isLoggedIn] = globalState.token;
  const addToCart = globalState.userAPI.addToCart;
  const [isAdmin] = globalState.userAPI.isAdmin;
  const [alert] = globalState.userAPI.alert;
  const { deleteProduct } = globalState.productsAPI;
  const { category, content, price, _id, checked } = product;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {isAdmin && (
          <Checkbox checked={checked} onChange={() => handleCheck(_id)} />
        )}
        <CardMedia
          className={classes.media}
          image={img}
          title="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {category}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="secondary"
            component="span"
          >
            ${price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isAdmin ? (
          <>
            <Button
              color="primary"
              style={{ width: "50%" }}
              text="Edit"
              href={`/edit_product/${_id}`}
            />
            <Button
              color="secondary"
              variant="outlined"
              style={{ width: "50%" }}
              text="Delete"
              onClick={() => deleteProduct(_id)}
            />
          </>
        ) : (
          <>
            <Button
              color="primary"
              style={{ width: "50%" }}
              text="Buy"
              href={isLoggedIn ? "#" : "/signup"}
              onClick={() => addToCart(product)}
            />
            <Button
              style={{ width: "50%" }}
              text="View"
              href={`/product/detail/${_id}`}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
}
