const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.amazon.in/dp/B0CB698HZL/?_encoding=UTF8&pd_rd_w=fPQ1P&content-id=amzn1.sym.5bd86a19-1531-4ba5-bf96-ff2b1a261ac1&pf_rd_p=5bd86a19-1531-4ba5-bf96-ff2b1a261ac1&pf_rd_r=P3WRHPZRX03NXSVH0KY4&pd_rd_wg=4cbhC&pd_rd_r=9d3741ff-46e9-4fcd-8c71-418ef117e03b";

const product = { name: "", price: "", link: "" };

async function scrape() {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const item = $("div#titleSection");
  product.name = $(item).find("h1 span#productTitle").text();
  const nitem = $("div .a-section");
  const price = $(nitem)
    .find("span .a-price-whole")
    .first()
    .text()
    .replace(/[,.]/g, "");
  console.log(product.name);
  product.price = parseInt(price);
  console.log(product.price);
}

scrape();
