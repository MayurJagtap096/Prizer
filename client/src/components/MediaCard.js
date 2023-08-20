import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia sx={{ height: 400 }} image={props.link} title="product" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography variant="h4" color="black">
          {props.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
