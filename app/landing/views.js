/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var $ = require("jquery");
var _ = require("underscore");
var Marionette = Backbone.Marionette;

var Views = app.module('Landing.Views');

Views.Main = Marionette.ItemView.extend({
  template: require('./main')
});

module.exports = Views;
