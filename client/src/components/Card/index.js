import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function MediaCard({ product }) {
  const { category, content, price, _id } = product;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
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
        <Button
          color="secondary"
          style={{ width: "50%" }}
          text="Buy"
          href="#"
        />
        <Button
          style={{ width: "50%" }}
          text="View"
          href={`/product/detail/${_id}`}
        />
      </CardActions>
    </Card>
  );
}
