/* jshint node: true */
"use strict";

var Backbone = require("backbone");
var FormUtils = require("utils/form");
var app = require("application");
var $ = require("jquery");
var _ = require("underscore");
var user = require("./current_user");
var Marionette = Backbone.Marionette;

var Views = app.module('Users.Views');

Views.SignInModal = Marionette.ItemView.extend({
  template: require('./sign_in_modal'),

  events: {
    'submit .modal-form': 'onSubmitForm'
  },

  onSubmitForm: function (ev) {
    ev.preventDefault();

    var form = ev.currentTarget;
    user.set(FormUtils.formToAttributes(form));
    FormUtils.clearFormErrors(form);

    app.execute('showLoading', true);

    user.save(null, {url: form.action})
      .always(function () {
        user.unset('password', {silent: true});
        app.execute('showLoading', false);
      })
      .done(_.bind(function (response) {
        user.set(user.parse(response));
        user.fetch();
        app.vent.trigger('navigate:dashboard');
        this.close();
      }, this))
      .fail(function (response) {
        FormUtils.showFormErrors(form, response);
      });
  }
});

module.exports = Views;
