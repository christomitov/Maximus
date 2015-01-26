'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InvoiceItem = new Schema({
  plan: Number,
  arb: Number,
  sku: String,
  title: String,
  unit: String,
  priceQty: Number,
  comments: String
});

var InvoiceSchema = new Schema({
  status: String,
  location: String,
  locationUrl: String,
  po: Number,
  network: Number,
  contract: Number,
  items: [InvoiceItem]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
