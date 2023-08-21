import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Link } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  return (
    <Card
      style={{
        maxWidth: 230,
        maxHeight: 400,
        marginRight: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 5,
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <CardMedia
        sx={{ height: 250 }}
        component="img"
        image={props.link}
        title="product"
        alt="product image"
      />
      <CardContent>
        <Typography gutterBottom component="div">
          {props.name}
        </Typography>
        <Typography variant="h6" color="black">
          {props.price}
        </Typography>
        <Button variant="contained" size="small">
          <Link
            href={props.url}
            underline="hover"
            target="_blank"
            sx={{ color: "white" }}
          >
            Shop here
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
