const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async function (req, res) {
  try {
    const { product } = req.body;
    console.log(product);
    const amspecs = { name: "", price: "", link: "" };
    const url = `https://www.amazon.in/s?k=${product}`;
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1",
      },
    });
    const $ = cheerio.load(data);
    const item = $("div.a-row");
    amspecs.price = $(item).find("span.a-offscreen").first().text();
    const titItem = $("div.a-section");
    amspecs.name = $(titItem).find("h2.a-size-mini").first().text();
    const imgItem = $("div.s-image-fixed-height");
    amspecs.link = $(imgItem).find("img.s-image").first().attr("src");
    console.log("Title: ", amspecs.name);
    console.log("Price: ", amspecs.price);
    console.log("Product Image: ", amspecs.link);
    res.json(amspecs);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.listen(4000, function () {
  console.log("Server set at http://localhost:4000");
});
