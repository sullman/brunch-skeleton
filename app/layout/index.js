/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var Marionette = Backbone.Marionette;
var AppRouter = require("utils/router");
var user = require("users/current_user");

var Layout = app.module('Layout');
var Views = require("./views");

var Router = AppRouter.extend({
  appRoutes: {
    '*default': 'redirect'
  }
});

var Controller = Marionette.Controller.extend({
  start: function () {
    app.splash.close();
    this.showHeader();
    this.showFooter();
  },

  showSplash: function () {
    app.splash.show(new Views.Splash());
  },

  showHeader: function () {
    app.header.show(new Views.Header({model: user}));
  },

  showFooter: function () {
    app.footer.show(new Views.Footer());
  },

  redirect: function () {
    if (user.id)
      app.vent.trigger('navigate:dashboard');
    else
      app.vent.trigger('navigate:landing');
  }
});

Layout.addInitializer(function () {
  var controller = new Controller();
  controller.router = new Router({
    controller: controller
  });

  controller.showSplash();
  app.once('initialize:asyncComplete', function () {
    controller.start();
  });
});

module.exports = Layout;
