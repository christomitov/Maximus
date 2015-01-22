'use strict';

var _ = require('lodash');
var Invoice = require('./invoice.model');

// Get list of invoices
exports.index = function(req, res) {
  Invoice.find(function (err, invoices) {
    if(err) { return handleError(res, err); }
    return res.json(200, invoices);
  });
};

// Get a single invoice
exports.show = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if(err) { return handleError(res, err); }
    if(!invoice) { return res.send(404); }
    return res.json(invoice);
  });
};

// Creates a new invoice in the DB.
exports.create = function(req, res) {
  Invoice.create(req.body, function(err, invoice) {
    if(err) { return handleError(res, err); }
    return res.json(201, invoice);
  });
};

// Updates an existing invoice in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Invoice.findById(req.params.id, function (err, invoice) {
    if (err) { return handleError(res, err); }
    if(!invoice) { return res.send(404); }
    var updated = _.merge(invoice, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, invoice);
    });
  });
};

// Deletes a invoice from the DB.
exports.destroy = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if(err) { return handleError(res, err); }
    if(!invoice) { return res.send(404); }
    invoice.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}