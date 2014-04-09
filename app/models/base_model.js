/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var BaseModel = Backbone.Model.extend({
  // An array of attribute names that should automatically be parsed as dates.
  dateAttrs: [
    'updated_at',
    'created_at'
  ],

  // A mapping of attribute names that should be instantiated as nested models.
  nestedAttrs: {
    // exampleAttr: Models.ExampleModel
  },

  // A Deferred object useful for ensuring that the data has been fetched
  // without necessarily refetching it. If the model was previously fetched,
  // populate will return immediately but could have stale data. If fresh
  // data is desired, the plain old fetch method can still be used.

  populate: function (options) {
    if (!this.populatePromise)
      this.populatePromise = this.fetch(options);

    return this.populatePromise;
  },

  fetch: function (options) {
    var xhr = Backbone.Model.prototype.fetch.apply(this, arguments);
    var deferred = $.Deferred();

    xhr.done(_.bind(function (response) {
      deferred.resolveWith(this, [this, response]);
    }, this));

    xhr.fail(_.bind(function (response) {
      deferred.rejectWith(this, [this, response]);
    }, this));

    this.populatePromise = deferred.promise();

    return this.populatePromise;
  },

  parse: function (response) {
    if (this.whitelistedAttrs)
      response = _.pick(response, this.whitelistedAttrs);

    if (this.dateAttrs) {
      _.each(this.dateAttrs, function (attr) {
        if (attr in response && response[attr])
          response[attr] = new Date(response[attr]);
      }, this);
    }

    if (this.nestedAttrs) {
      _.each(this.nestedAttrs, function (ctor, attr) {
        if (attr in response)
          response[attr] = new ctor(response[attr], {parse: true});
      }, this);
    }

    return response;
  },

  toJSON: function () {
    return _.reduce(this.attributes, function (memo, value, key) {
      if (_.isObject(value) && _.isFunction(value.toJSON))
        memo[key] = value.toJSON();
      else
        memo[key] = value;
      return memo;
    }, {}, this);
  },

  excludeKeysForUpdate: [],

  getDataForUpdate: function () {
    var data = {};
    if (this.paramRoot) {
      data[this.paramRoot] = _.omit(this.toJSON(), this.excludeKeysForUpdate);
    } else {
      data = _.omit(this.toJSON(), this.excludeKeysForUpdate);
    }
    return data;
  }
});

// Wrap Backbone.Sync to use our getDataForUpdate
Backbone.sync = _.wrap(Backbone.sync, function (origFn, method, model, options) {
  _.defaults(options || (options = {}), {
    attrs: model.getDataForUpdate ? model.getDataForUpdate() : model.toJSON(options)
  });

  return origFn(method, model, options);
});

module.exports = BaseModel;
