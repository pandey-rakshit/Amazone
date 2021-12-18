const Product = require('../models/product');
// const Order = require('../models/order');


exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      // console.log(products);
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Home',
        path: '/',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};


