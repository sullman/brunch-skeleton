/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var $ = require("jquery");
var BaseModels = require("models");

var Models = app.module('Users.Models');

Models.UserModel = BaseModels.BaseModel.extend({
  // TODO: Define actual methods/properties, like url. In the meantime, sync
  // is overridden to wait a second and then respond with whatever properties
  // the model already had. If any attributes are set and create is called, an
  // ID will be set.

  sync: function (method, model, options) {
    console.log('Simulating sync for UserModel, method is:' + method);
    var deferred = $.Deferred();
    var response = _.extend({}, model.attributes);

    if (!_.isEmpty(response) && method == 'create')
      response.id = 'deadbeef';

    _.delay(function () {
      deferred.resolve(response);
    }, 1000);

    return deferred.promise();
  }
});

module.exports = Models;
