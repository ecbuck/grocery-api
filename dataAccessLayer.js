const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
const databaseName = "grocery-db";
const mongoDbUrl = process.env.MONGODB_URL;
const collectionName = "products";

const settings = {
  useUnifiedTopology: true
};

console.log("mongoDbUrl: " + mongoDbUrl);

let database;

const Connect = function() {
  return new Promise((resolve, reject) =>
    MongoClient.connect(mongoDbUrl, settings, function(err, client) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY CONNECTED TO DATABASE!");
        database = client.db(databaseName);
        resolve();
      }
    })
  );
};

const Insert = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.insertOne(product, function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY INSERTED A NEW DOCUMENT!");
        resolve(res);
      }
    });
  });
};

const Find = function(product) {
  let productQuery = {};

  if (product) {
    productQuery = product;
  }

  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.find(productQuery).toArray(function(err, res) {
      if (err) {
        reject(err);
      } 
      else {
        console.log("Found your product!");
        resolve(res);
      }
    });
  });
};

const Update = function(product, newProduct) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.updateOne(product, newProduct, function(err, res) {
      if (err) {
        reject(err);
      } else {
        console.log("Updated successfully!");
        resolve(res);
      }
    });
  });
};
const Remove = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.deleteOne(product, function(err, res) {
      if (err) {
        reject(err);
      } 
      else {
        console.log("Removed successfully!");
        resolve(res);
      }
    });
  });
};

module.exports = { Connect, Insert, Find, Update, Remove };

//const promise = Connect();

//promise
//.then(() => {
// console.log("Promise finished successfully!");

// const product = {
// name: "hot dogs",
//  price: 9.99
// };

// Find()
// .then(res => {
// console.log("found all");
// console.log(res);
// })
// .catch(res => {
// console.log("did not find all");
// });

//     .then((res) =>{
//         console.log('Added a new document')
//     })
//     .catch((err) => {
//         console.log('failed to add a new document')

//     })

// const newProduct = {
//     $set: {
//         name: 'hot dogs'
//     }
// };

// Update(product, newProduct)
//     .then((res)=>{
//         console.log('successfully updated product');
//     })
//     .catch((err)=>{
//         console.log('failed to update');
//     })

// Remove(product)
//     .then((res)=>{
//         console.log('successfully removed');
//     })
//     .catch((err)=>{
//         console.log('failed to remove');
//     })
//})
// .catch(err => {
//  console.log("Promise finished with an error!");
//});
