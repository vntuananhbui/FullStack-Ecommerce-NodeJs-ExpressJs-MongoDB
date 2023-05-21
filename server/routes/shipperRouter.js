// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Le Long An,Truong Hong Van,Bui Tuan Anh,Lao Vinh Khang,Pham Le Quynh Anh
// ID: s3963207,s3957034,s3970375,s3891925,s3927427
// Acknowledgement: MDN Web Docs, RMIT Canvas, ChatGPT, NPM Packages' Docs


const express = require('express');
const router = express.Router();
const { authMiddleware, checkShipperRole } = require('../../middlewares/authMiddleware');
const { checkShipperHub, orderDetailShipper, shipperDashboard, updateOrderStatus, updateOrderStatusCancel } = require('../controllers/shipperCtrl');
const Order = require('../model/orderModel');
const Product = require('../model/Product')
// Route to show the order detail
router.get('/:orderId', authMiddleware, checkShipperRole, checkShipperHub, orderDetailShipper);
router.get('/', authMiddleware, checkShipperRole, checkShipperHub, shipperDashboard);
router.post('/:orderId/delivered', authMiddleware, checkShipperRole, checkShipperHub, updateOrderStatus);
router.post('/:orderId/cancel', authMiddleware, checkShipperRole, checkShipperHub, updateOrderStatusCancel);
router.get('/ordercreate', authMiddleware, checkShipperRole, checkShipperHub, async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.render('orderCreate', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
