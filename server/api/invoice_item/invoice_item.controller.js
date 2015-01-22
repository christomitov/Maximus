'use strict';

var _ = require('lodash');
var InvoiceItem = require('./invoice_item.model');

// Get list of invoice_items
exports.index = function(req, res) {
  InvoiceItem.find(function (err, invoice_items) {
    if(err) { return handleError(res, err); }
    return res.json(200, invoice_items);
  });
};

// Get a single invoice_item
exports.show = function(req, res) {
  InvoiceItem.findById(req.params.id, function (err, invoice_item) {
    if(err) { return handleError(res, err); }
    if(!invoice_item) { return res.send(404); }
    return res.json(invoice_item);
  });
};

// Creates a new invoice_item in the DB.
exports.create = function(req, res) {
  InvoiceItem.create(req.body, function(err, invoice_item) {
    if(err) { return handleError(res, err); }
    return res.json(201, invoice_item);
  });
};

// Updates an existing invoice_item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  InvoiceItem.findById(req.params.id, function (err, invoice_item) {
    if (err) { return handleError(res, err); }
    if(!invoice_item) { return res.send(404); }
    var updated = _.merge(invoice_item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, invoice_item);
    });
  });
};

// Deletes a invoice_item from the DB.
exports.destroy = function(req, res) {
  InvoiceItem.findById(req.params.id, function (err, invoice_item) {
    if(err) { return handleError(res, err); }
    if(!invoice_item) { return res.send(404); }
    invoice_item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}