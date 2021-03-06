'use strict';

var _ = require('lodash');
var Invoice = require('./invoice.model');
var JSZip = require('jszip');
var fs = require('fs');
var mongoose = require('mongoose')

exports.upload = function(req, res) {
  // TODO: Upload function for invoice documents
  console.log(req.params);


  if (fs.existsSync('/uploads/' + req.params.id + '.zip')) {
    // Delete that
  }

  var zip = new JSZip();
  console.log(req.files);
  //zip.file(file.originalname, )
  // req.files.forEach(function(file, index) {
  //   console.log(file);
  //   //zip.file()
  // });

  return res.send(200);
}

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
  Invoice.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, invoice) {
    return res.json(200, invoice);
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
