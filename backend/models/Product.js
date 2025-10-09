const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['electronics', 'clothing', 'furniture', 'food', 'other'], required: true },
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  totalValue: { type: Number },
  imageUrl: { type: String, required: true },
  imgUrl : {type:String, required:true},
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
}, { timestamps: true });

productSchema.pre('save', function (next) {
  this.totalValue = this.quantity * this.pricePerUnit;
  next();
});

module.exports = mongoose.model('Product', productSchema);
