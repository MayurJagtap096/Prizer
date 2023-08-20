import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import MediaCard from "./MediaCard";

export default function BasicTextFields() {
  const [field, setfield] = useState({});
  const [product, setProduct] = useState(false);
  const [specs, setSpecs] = useState({});

  function handleChange(e) {
    setfield({ ...field, [e.target.name]: e.target.value });
  }

  function funcSet() {
    return (
      <MediaCard name={specs.name} link={specs.link} price={specs.price} />
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(field),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 500) {
      alert("Not ok");
    } else {
      setProduct(!product);
      const amspecs = await res.json();
      console.log(amspecs);
      setSpecs(amspecs);
    }
  }

  return (
    <div>
      <form action="/" method="post">
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <h3>Please Enter the Product details</h3>
          </div>
          <TextField
            name="product"
            value={field.product || ""}
            size="small"
            id="outlined-basic"
            onChange={handleChange}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            style={{ background: "#2E3B55" }}
          >
            Search
          </Button>
        </Box>
      </form>
      {product && <>{funcSet()}</>}
    </div>
  );
}
