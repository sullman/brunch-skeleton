/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var _ = require("underscore");
var Marionette = Backbone.Marionette;
var AppRouter = require("utils/router");

var Landing = app.module('Landing');
var Views = require("./views");

var Router = AppRouter.extend({
  appRoutes: {
    '!/landing': 'showLanding'
  }
});

var Controller = Backbone.Marionette.Controller.extend({
  start: function () {
  },

  showLanding: function () {
    var view = new Views.Main();
    app.main.show(view);
  }
});

Landing.addInitializer(function () {
  var controller = new Controller();
  controller.router = new Router({
    controller: controller
  });

  controller.start();
  Landing.controller = controller;
});

app.vent.on('navigate:landing', function () {
  Landing.controller.router.navigate('!/landing', {trigger: true});
});

module.exports = Landing;
