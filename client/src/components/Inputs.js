import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import MediaCard from "./MediaCard";

export default function BasicTextFields() {
  const [field, setfield] = useState({});
  const [product, setProduct] = useState(false);
  const [specs, setSpecs] = useState({});
  const [flipspecs, setFlipSpecs] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setfield({ ...field, [e.target.name]: e.target.value });
  }

  function funcSet() {
    return (
      <>
        <MediaCard
          name={specs.name}
          link={specs.link}
          price={specs.price}
          url={specs.url}
        />
        <MediaCard
          name={flipspecs.name}
          link={flipspecs.link}
          price={flipspecs.price}
          url={flipspecs.url}
        />
      </>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(field),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 500) {
      alert("Not ok");
    } else {
      const ans = await res.json();
      const amspecs = ans[0];
      const flipspecs = ans[1];
      setProduct(!product);
      setIsLoading(false);
      setFlipSpecs(flipspecs);
      setSpecs(amspecs);
    }
  }
  const override = css`
    display: inline-block;
    margin: 0 auto;
  `;

  return (
    <div>
      <form action="/" method="post">
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="on"
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100px",
        }}
      >
        {isLoading ? (
          <ClipLoader color="#2E3B55" loading={true} css={override} />
        ) : (
          product && <>{funcSet()}</>
        )}
      </div>
    </div>
  );
}
