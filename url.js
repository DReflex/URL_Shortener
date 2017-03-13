'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(mongoose.connection);
var urlSchema = mongoose.Schema({
	originalUrl: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
});

urlSchema.plugin(autoIncrement.plugin, 'Url');
var Url = mongoose.model('Url', urlSchema);

module.exports = Url;