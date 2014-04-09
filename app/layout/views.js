/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var app = require("application");
var $ = require("jquery");
var Marionette = Backbone.Marionette;
var Spinner = require("spin");

var Views = app.module('Layout.Views');

Views.Header = Marionette.ItemView.extend({
  template: require('./header'),
  tagName: 'header',
  className: 'navbar navbar-inverse navbar-fixed-top',

  events: {
    'click .nav a': 'onClickNav'
  },

  initialize: function () {
    if (this.model) {
      this.listenTo(this.model, 'change', this.render, this);
    }
  },

  onClickNav: function (ev) {
    var $link = $(ev.currentTarget);
    var id = $link.data('navId');

    // If this link has a data-nav-id, then trigger a navigation event and
    // cancel the default behavior. Otherwise, assume there's an href and
    // let the event go through.
    if (id) {
      ev.preventDefault();
      app.vent.trigger('nav:' + id);
    }
  }
});

Views.Footer = Marionette.ItemView.extend({
  template: require('./footer')
});

Views.Splash = Marionette.ItemView.extend({
  template: require('./splash')
});

Views.ModalRegion = Marionette.Region.extend({
  el: '#modal',

  getEl: function (selector) {
    var $el = $(selector);
    $el.on('hidden.bs.modal', this.close);
    return $el;
  },

  onShow: function (view) {
    view.on('close', this.hideModal, this);
    this.$el.modal('show');
  },

  hideModal: function () {
    this.$el.modal('hide');
  }
});

// Loading Alert

var loadingCount = 0;

Views.LoadingAlert = Marionette.View.extend({
  className: 'alert-overlay loading',

  initialize: function () {
    this.spinner = new Spinner({
      color: '#fff',
      width: 3,
      length: 6
    });
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.spinner.spin().el);
    return this;
  },

  onClose: function () {
    this.spinner.stop();
  }
});

app.commands.setHandler('showLoading', function (show) {
  if (loadingCount < 0)
    loadingCount = 0;

  if (show) {
    if (loadingCount === 0)
      app.alert.show(new Views.LoadingAlert());

    loadingCount++;
  } else {
    loadingCount--;

    if (loadingCount === 0)
      app.alert.close();
  }
});

Views.addInitializer(function () {
  app.addRegions({
    'modal': Views.ModalRegion
  });
});

module.exports = Views;
