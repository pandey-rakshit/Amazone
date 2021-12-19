const Product = require('../models/product');
const Order = require('../models/order');


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

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.getCart = (req, res) => {
  req.user
    .populate('cart.items.productId')

    .then(user => {
      const products = user.cart.items;
      // console.log(products);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.postOrder = (req, res) => {
  req.user
    .populate('cart.items.productId')

    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const totalPrice = 300;
      const order = new Order({
        user: {
          userName: req.user.userName,
          userId: req.user
        },
        totalPrice:totalPrice,
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      // res.redirect('/')
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};


exports.getOrders = (req, res) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
