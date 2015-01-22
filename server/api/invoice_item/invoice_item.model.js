'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvoiceItemSchema = new Schema({
  plan: Number,
  arb: Number,
  sku: String,
  title: String,
  unit: String,
  priceQty: Number,
  comments: String
});

module.exports = mongoose.model('InvoiceItem', InvoiceItemSchema);
