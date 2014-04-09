/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var user = require("users/current_user");
var _ = require("underscore");
var Marionette = Backbone.Marionette;

var Router = Marionette.AppRouter.extend({
  checkAuthorization: function () {
    if (!user.id) {
      app.vent.trigger('navigate:landing');
      return false;
    }

    return true;
  },

  constructor: function (options) {
    var authRoutes = Marionette.getOption(this, "authRoutes");
    var controller = options.controller;

    _.each(authRoutes, function (route) {
      controller[route] = _.wrap(controller[route], _.bind(function (orig) {
        if (this.checkAuthorization()) {
          orig.apply(this, _.toArray(arguments).slice(1));
        }
      }, this));
    }, this);

    Marionette.AppRouter.prototype.constructor.apply(this, arguments);
  }
});

module.exports = Router;
