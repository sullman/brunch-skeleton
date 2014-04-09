/* jshint node: true */
"use strict";

var $ = require("jquery");
var _ = require("underscore");

var form_error_template = require('./form_error');
var form_error_inline_template = require('./form_error_inline');

var FormUtils = {
  createAjaxOptions: function (form) {
    var options = {
      type: $(form).data('method') || form.method || 'GET',
      url: form.action
    };

    options.data = _.reduce($(form).serializeArray(), function (memo, val) {
      memo[val.name] = val.value;
      return memo;
    }, {});

    return options;
  },

  formToAttributes: function (form) {
    return _.reduce($(form).serializeArray(), function (memo, val) {
      if (memo[val.name]) {
        if (_.isArray(memo[val.name])) {
          memo[val.name].push(val.value);
        } else {
          memo[val.name] = [memo[val.name], val.value];
        }
      } else {
        memo[val.name] = val.value;
      }
      return memo;
    }, {});
  },

  showFormErrors: function (form, response) {
    var $form = $(form);
    var obj = JSON.parse(response.responseText);

    // Handle general form errors
    if ('error' in obj) {
      var $container = $form.find('.form-error-container');
      var data = {
        error: _.isArray(obj.error) ? obj.error.join(', ') : obj.error,
        type: $container.data('displayType')
      };
      $container.html(form_error_template(data));
      $container.removeClass('hide').show();
    }

    // Handle field-specific errors
    if ('errors' in obj) {
      _.each(obj.errors, function (error, field) {
        var $input = $form.find('[name$="[' + field + ']"]');
        if ($input.length == 0)
          $input = $form.find('[name="' + field + '"]');
        if ($input.length == 0)
          $input = $form.find('[name*="' + fild + '"]');

        var style = 'inline';
        if ($input.next(".add-on").length > 0) {
          style = 'block';
          $input = $input.next('.add-on');
        }

        if ($input.attr('type') == 'checkbox') {
          style = 'block';
          $input = $input.closest('label');
        }

        $input.after(form_error_inline_template({style: style, error: _.isArray(error) ? error.join(', ') : error}));
        $input.closes('form-group').addClass('has-error');
      });
    }
  },

  clearFormErrors: function (form) {
    var $form = $(form);

    $form.find('form-error-container').empty().hide();
    var $group = $form.find('form-group.has-error');
    $group.find('.help-inline').remove();
    $group.find('.help-block').remove();
    $group.removeClass('has-error');
  }
};

module.exports = FormUtils;
