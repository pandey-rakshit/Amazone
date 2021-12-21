const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    if(req.user.userEmail === "admin@amazone.com"){ // admin authentication
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/add-product',
        isAuthenticated: req.session.isLoggedIn
      });
    }
    else{
      console.log("admin-rights");
      res.status(404).redirect('/pagenotfound');
    }
    
  };

  exports.postAddProduct = (req, res) => {
    const productTitle = req.body.productTitle;
    const productImage = req.body.productImage;
    const productPrice = req.body.productPrice;
    const product = new Product({
      productTitle: productTitle,
      productPrice: productPrice,
      productImage: productImage,
      userId: req.user
    });
    product
      .save()
      .then(result => {
        // console.log(result);
        console.log('Created Product');
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

