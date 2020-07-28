const Product = require('../models/productModel');
const cloudinary = require('../utils/cloudinary');
const bufferToString = require('../utils/convertBufferToStr');
const readXlsxFile = require('read-excel-file/node');
const path = require('path');

// ALL CONTROLLER

// to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'Success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

// to get a single product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
};

// to create a product

let imageContent, image_url;
exports.createProduct = async (req, res) => {
  try {
    imageContent = bufferToString(req.file.originalname, req.file.buffer)
      .content;
    await cloudinary.uploader.upload(imageContent, (err, imageResponse) => {
      if (err) console.log(err);
      else {
        image_url = imageResponse.secure_url;
        console.log('log from cloudinary', image_url);
      }
    });
    // console.log(req.body);
    const prod = req.body;
    prod.photo = image_url;
    // prod.resturant_id = req.client_id;
    console.log(prod);
    const newProduct = await Product.create(prod);
    res.status(201).json({
      status: 'Success',
      message: 'Product successfully added to DB',
      data: {
        User: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};

// upload product in bulk
exports.uploadInBulk = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send('Please upload an excel file!');
    }

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let allProducts = [];

      rows.forEach((row) => {
        let product = {
          resturant_id: row[0],
          name: row[1],
          rating: row[2],
          price: row[3],
          category: row[4],
          photo: row[5],
          options: row[6],
          status: row[7],
        };

        allProducts.push(product);
      });

      Product.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message: 'Uploaded the file successfully: ' + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: 'Fail to import data into database!',
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    });
  }
};

// to update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};

// to delete an product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Error',
      err,
    });
  }
};
