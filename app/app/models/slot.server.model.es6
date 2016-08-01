'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SlotSchema = new Schema({
	taskId: String,
	eventId: String,
	title: String,
	priority: Number,
	duration: Number,
	start: Date,
	end: Date,
	className: String,
	overlap: false
});

mongoose.model('Slot', SlotSchema);
