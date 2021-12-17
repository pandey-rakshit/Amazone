const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    },
    cart: {
        items: [
            {
                productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);