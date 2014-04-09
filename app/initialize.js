/* jshint node: true */
"use strict";

var $ = require("jquery");
var Backbone = require("backbone");
var app = require("application");
var Swag = require("swag");
var _ = require("underscore");
var Marionette = Backbone.Marionette;

// Require any modules that should be loaded automatically
var Layout = require("layout");
var Users = require("users");
var Dashboard = require("dashboard");
var Landing = require("landing");

app.addInitializer(function () {
  Swag.registerHelpers();
});

var asyncInitializers = [];
app.addAsyncInitializer = function (promise) {
  asyncInitializers.push(promise);
}

app.on('initialize:after', function () {
  // We want to wait for every deferred to finish, regardless of success or
  // failure. So we can't use a simple when, and instead use this monstrosity.
  Marionette.$.when.apply(Marionette.$, _.map(asyncInitializers, function (promise) {
    var wrapped = Marionette.$.Deferred();
    promise.always(function () {
      wrapped.resolve();
    });
    return wrapped;
  })).always(function () {
    if (Backbone.history)
      Backbone.history.start();

    app.triggerMethod('initialize:asyncComplete');
  });
});

$(function () {
  app.start();
});
