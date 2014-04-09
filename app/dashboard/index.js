/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var _ = require("underscore");
var user = require("users/current_user");
var Marionette = Backbone.Marionette;
var AppRouter = require("utils/router");

var Dashboard = app.module('Dashboard');
var Views = require("./views");

var Router = AppRouter.extend({
  appRoutes: {
    '!/dashboard': 'showMainDashboard'
  },

  authRoutes: [
    'showMainDashboard'
  ]
});

var Controller = Backbone.Marionette.Controller.extend({
  start: function () {
  },

  showMainDashboard: function () {
    var view = new Views.Main({model: user});
    app.main.show(view);
  }
});

Dashboard.addInitializer(function () {
  var controller = new Controller();
  controller.router = new Router({
    controller: controller
  });

  controller.start();
  Dashboard.controller = controller;
});

app.vent.on('navigate:dashboard', function () {
  Dashboard.controller.router.navigate('!/dashboard', {trigger: true});
});

module.exports = Dashboard;
