'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  sku: String,
  title: String,
  description: String,
  additionalInfo: String,
  unit: String,
  unitPrice: Number,
  winterPrice: Number,
  winterPremium: Number
});

module.exports = mongoose.model('Item', ItemSchema);
