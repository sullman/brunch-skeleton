/* jshint node: true */
"use strict";

var Backbone = require("backbone");

var app = new Backbone.Marionette.Application();

app.addRegions({
  header: '#nav',
  main: '#main',
  footer: '#footer',
  splash: '#splash',
  alert: '#alert'
});

module.exports = app;
