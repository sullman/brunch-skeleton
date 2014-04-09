/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var _ = require("underscore");
var BaseModel = require("./base_model");

// A simple model that's useful when we want to pass multiple models to a view,
// usually some derivation of an ItemView. All of the initial attributes are
// assumed to be models themselves, and change events on those models are
// triggered as change events on the container model. That allows the view
// to do things like create a model event to rerender on any model change.

var NestedModelContainer = BaseModel.extend({
  initialize: function (attrs, options) {
    BaseModel.prototype.initialize.apply(this, arguments);

    _.each(attrs, function (value, key, list) {
      this.listenTo(value, 'change', _.bind(function () {
        this.trigger('change', this);
      }, this));
    }, this);
  }
});

module.exports = NestedModelContainer;
