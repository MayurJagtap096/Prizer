const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

async function amazonScrape(url) {
  const amspecs = { name: "", price: "", link: "", url: "" };
  const amurl = url;
  amspecs.url = amurl;
  const { data } = await axios.get(amurl, {
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
  amspecs.name = amspecs.name.substring(0, 25);
  const imgItem = $("div.s-image-fixed-height");
  amspecs.link = $(imgItem).find("img.s-image").first().attr("src");
  return amspecs;
}

async function flipkartScrape(url) {
  const flipspecs = { name: "", price: "", link: "", url: "" };
  flipspecs.url = url;
  const { data } = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "axios 0.21.1",
    },
  });
  const $$ = cheerio.load(data);
  const ite = $$("div.col");
  const imgIte = $$("div.CXW8mj");
  flipspecs.link = $$(imgIte).find("img._396cs4").first().attr("src");
  flipspecs.name = $$(ite).find("div._4rR01T").first().text();
  flipspecs.price = $$(ite).find("div._30jeq3").first().text();
  return flipspecs;
}

app.post("/", async function (req, res) {
  try {
    const { product } = req.body;
    console.log(product);

    const amurl = `https://www.amazon.in/s?k=${product}`;
    const flipurl = `https://www.flipkart.com/search?q=${product}`;

    const amspecs = await amazonScrape(amurl);
    const flipspecs = await flipkartScrape(flipurl);

    const ans = [amspecs, flipspecs];
    res.json(ans);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.listen(4000, function () {
  console.log("Server set at http://localhost:4000");
});
