const UserMenu = require('../models/productModel');
const cloudinary = require('../utils/cloudinary');
const bufferToString = require('../utils/convertBufferToStr');
const readXlsxFile = require('read-excel-file/node');
const path = require('path');

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await UserMenu.find();
    res.status(200).json({
      status: 'Success',
      results: menus.length,
      data: {
        menus,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
