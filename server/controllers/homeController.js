// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Le Long An,Truong Hong Van,Bui Tuan Anh,Lao Vinh Khang,Pham Le Quynh Anh
// ID: s3963207,s3957034,s3970375,s3891925,s3927427
// Acknowledgement: MDN Web Docs, RMIT Canvas, ChatGPT, NPM Packages' Docs


require('../model/database');
const Category = require('../model/Category');
const Product = require('../model/Product');

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const cart = JSON.parse(localStorage.getItem('cart')) || {};
const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Product.find({}).limit(limitNumber);
    const tablet = await Product.find({ 'category': 'Tablet' }).limit(limitNumber);
    const laptop = await Product.find({ 'category': 'Laptop' }).limit(limitNumber);
    const phone = await Product.find({ 'category': 'Phone' }).limit(limitNumber);

    const productCategory = { latest, tablet, laptop, phone };

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

    res.render('home-page/index', { title: 'E-Commerce - Home', categories, productCategory, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /home/categories
 * Categories 
*/
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('home-page/categories', { title: 'E-Commerce - Categories', categories, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });

  }
}


/**
 * GET /home/categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 10;
    const categoryById = await Product.find({ 'category': categoryId }).limit(limitNumber);
    res.render('home-page/categories', { title: 'E-Commerce - Categoreis', categoryById, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });

  }
}

/**
 * GET /product/:id
 * Product 
*/
exports.exploreProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    const product = await Product.findById(productId);
    res.render('home-page/product', { title: 'E-Commerce - Product', product, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });

  }
}


/**
 * POST /home/search
 * Search 
*/
exports.searchProduct = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let minPrice = req.body.minPrice;
    let maxPrice = req.body.maxPrice;

    let query = { $text: { $search: searchTerm, $diacriticSensitive: true } };
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }

    let product = await Product.find(query);
    res.render('home-page/search', { title: 'E-Commerce - Search', product, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.status(500).redirect(`/home/search?error=Product_not_found`);
  }
}


/**
 * GET /home/explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const product = await Product.find({}).limit(limitNumber);
    res.render('home-page/explore-latest', { title: 'E-Commerce - Explore Latest', product, cartItemCount, layout: './layouts/homeLayout' });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });

  }
}

/**
 * GET /home/submit-product
 * Submit Product
*/
// exports.submitProduct = async (req, res) => {
//   const infoErrorsObj = req.flash('infoErrors');
//   const infoSubmitObj = req.flash('infoSubmit');
//   res.render('submit-product', { title: 'E-Commerce - Submit Product', infoErrorsObj, infoSubmitObj, layout: './layouts/homeLayout' });
// }

// /**
//  * POST /home/submit-product
//  * Submit Product
// */
// exports.submitProductOnPost = async (req, res) => {
//   try {

//     let imageUploadFile;
//     let uploadPath;
//     let newImageName;

//     if (!req.files || Object.keys(req.files).length === 0) {
//       console.log('No Files where uploaded.');
//     } else {

//       imageUploadFile = req.files.image;
//       newImageName = Date.now() + imageUploadFile.name;

//       uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

//       imageUploadFile.mv(uploadPath, function (err) {
//         if (err) return res.satus(500).send(err);
//       })

//     }

//     const newProduct = new Product({
//       v_id: req.user._id,
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       productNotes: req.body.productNotes,
//       category: req.body.category,
//       image: newImageName
//     });

//     await newProduct.save();

//     req.flash('infoSubmit', 'Product has been added.')
//     res.redirect('/home/submit-product');
//   } catch (error) {
//     // res.json(error);
//     req.flash('infoErrors', error)
//     res.redirect('/home/submit-product');
//   }
// }

/**
 * Dummy Data Initialize
*/
// async function insertDymmyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         "name": "Tablet",
//         "image": "tablet.jpg"
//       },
//       {
//         "name": "Laptop",
//         "image": "laptop.png"
//       },
//       {
//         "name": "Phone",
//         "image": "phone.jpg"
//       },
//       {
//         "name": "Sound",
//         "image": "sound.png"
//       },
//       {
//         "name": "Keyboard",
//         "image": "keyboard.jpg"
//       },
//       {
//         "name": "Screen",
//         "image": "screen.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyCategoryData();


