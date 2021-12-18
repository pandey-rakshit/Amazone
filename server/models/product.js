const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productTitle: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);