/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var BaseCollection = Backbone.Collection.extend({
  // A Deferred object to fetch the content of the collection one time.
  // This is useful for ensuring a collection is populated before using
  // it and will return immediately if it's already been fetched. The
  // plain old fetch method can still be used to refresh the content.

  populate: function (options) {
    if (!this.populatePromise)
      this.populatePromise = this.fetch(options);

    return this.populatePromise;
  },

  fetch: function (options) {
    var xhr = Backbone.Collection.prototype.fetch.apply(this, arguments);
    var deferred = $.Deferred();

    xhr.done(_.bind(function (response) {
      deferred.resolveWith(this, [this, response]);
    }, this));

    xhr.fail(_.bind(function (response) {
      deferred.rejectWith(this, [this, response]);
    }, this));

    this.populatePromise = deferred.promise();

    return this.populatePromise;
  }
});

module.exports = BaseCollection;
