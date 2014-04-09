/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var _ = require("underscore");
var Marionette = Backbone.Marionette;
var AppRouter = require("utils/router");

var Users = app.module('Users');
var Views = require("./views");
var Models = require("./models");

var user = require("./current_user");

var Router = AppRouter.extend({
});

var Controller = Marionette.Controller.extend({
  start: function () {
    app.vent.on('nav:sign_in', _.bind(this.onClickSignIn, this));
    app.vent.on('nav:sign_out', _.bind(this.onClickSignOut, this));
  },

  onClickSignIn: function () {
    var modal = new Views.SignInModal();
    app.modal.show(modal);
  },

  onClickSignOut: function () {
    // TODO: Normally you'd actually sign the user out here, like do a
    // DELETE /users/sign_out or something. To illustrate the behavior, we're
    // simply delaying.

    app.execute('showLoading', true);
    _.delay(function () {
      app.execute('showLoading', false);
      window.location.href = '';
    }, 1000);
  }
});

Users.addInitializer(function () {
  var controller = new Controller();
  controller.router = new Router({
    controller: controller
  });

  controller.start();
});

app.on('initialize:before', function () {
  app.addAsyncInitializer(user.fetch());
});

module.exports = Users;
