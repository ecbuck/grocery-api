const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const DAL = require("./dataAccessLayer");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.json());

DAL.Connect();

// const mongodbUsername = process.env.MONGODB_USERNAME;
// console.log('mongodbUsername: '+ mongodbUsername);

// const products = require("./products.json");
// stateless now

app.get("/api/products", cors(), async function(req, res) {
  // const result = Object.values(products);

  const result = await DAL.Find();

  res.send(result);
});
//get one product by id endpoint
app.get("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;

  const product = {
    _id: ObjectId(id)
  };

  const result = await DAL.Find(product);

  // const result = await DAL.Find();

  if (result) {
    res.send(result);
  } else {
    res.send("No product with ID: " + id + " found!");
  }
});

app.put("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;
  const product = {
    _id: ObjectId(id)
  };
  const newProduct = req.body;

  const updatedProduct = {
    $set: newProduct
  };

  const result = await DAL.Update(product, updatedProduct);

  res.send(result);
});

app.delete("/api/products/:id", cors(), async function(req, res) {
  const id = req.params.id;
  const product = {
    _id: ObjectId(id)
  };

  const result = await DAL.Remove(product);
  res.send();
});

app.post("/api/products", cors(), async function(req, res) {
  const product = req.body;

  if (product.name && product.price > 0) {
    const result = await DAL.Insert(product);

    res.send("Success");
  } else {
    res.send("Fail");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
