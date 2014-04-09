/* jshint node: true */
"use strict";

var app = require("application");

var Models = app.module('Models');

Models.BaseModel = require("./base_model");
Models.BaseCollection = require("./base_collection");
Models.NestedModelContainer = require("./nested_model_container");

module.exports = Models;