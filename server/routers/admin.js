const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isauth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',isauth, adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', isauth, adminController.postAddProduct);

module.exports = router;