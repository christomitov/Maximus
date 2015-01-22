'use strict';

var _ = require('lodash');
var Item = require('./item.model');
var fs = require('fs');

var unitMap = {
  'CU METRE' : 'CUBIC METRE',
  'CU M' : 'CUBIC METRE',
  'SQ M' : 'SQUARE METRE',
  'SQ METRE' : 'SQUARE METRE',
  'EA' : 'EACH',
  'M' : 'METRE'
}

/* Function to check for dictionary item and return default if it
* doesn't exist
*/
var getProperty = function(o, prop) {
  if (o[prop] !== undefined) return o[prop];
  else return prop;
}

exports.import = function(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {
    if (err) throw err;

    var lines = data.toString().split("\n");
    lines.forEach(function(line) {
      var fields = line.split("~");
      if (fields.length > 1 && fields[0].length <= 8) {
        if (typeof fields[4] != 'undefined') {
          fields[4] = getProperty(unitMap, fields[4].replace(/[\.]/g, "").toUpperCase());
        }
        if (fields[5] != undefined) {
          fields[5] = fields[5].replace(/[\$]/g, "").trim();
        }
        var item = {
          sku: fields[0],
          title: fields[1],
          description: fields[2],
          additionalInfo: fields[3],
          unit: fields[4],
          unitPrice: fields[5],
          winterPrice: fields[6],
          winterPremium: fields[7],
          name: fields[0] + " " + fields[1]
        }
        console.log("creating item...", item);
        Item.create(item, function(err, item) {

        });
      }
    });

  });
  return res.send(200);
};

// Get list of items
exports.index = function(req, res) {
  Item.find(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.json(200, items);
  });
};

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    return res.json(item);
  });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.json(201, item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, item);
    });
  });
};

// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.send(404); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
