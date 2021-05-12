// itemRoutes.js

var express = require('express');
var app = express();
var itemRoutes = express.Router();

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
itemRoutes.route('/add').post(function (request, res) {
  var item = new Item(request.body);
      item.save()
    .then(item => {
    res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (request, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (request, res) {
  var id = request.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (request, res) {
  Item.findById(request.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = request.body.name;
      item.price = request.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (request, res) {
  Item.findByIdAndRemove({_id: request.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = itemRoutes;