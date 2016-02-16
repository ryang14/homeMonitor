var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/homeMonitor');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB')
});

var readingSchema = new mongoose.Schema({
    name: String,
    time: { type: String, default: Date.now },
    reading: String,
}, {versionKey: false});
var Reading = mongoose.model('reading', readingSchema);

var sensorSchema = new mongoose.Schema({
    name: String,
		title: String,
    type: String,
		min: { type: String, default: 0 },
		max: { type: String, default: 100 },
}, {versionKey: false});
var Sensor = mongoose.model('sensor', sensorSchema);

router.get('/readings', function(req, res){
	if(req.query.name) {
		Reading.find({ "name" : req.query.name }, function (err, readings) {
			if (err) return console.error(err);
			if(readings.length) res.send(readings);
			else res.send('No readings');
		})
	} else{
		Reading.find(function (err, readings) {
			if (err) return console.error(err);
			if(readings.length) res.send(readings);
			else res.send('No readings');
		})
	}
});

router.get('/reading', function(req, res){
	if(req.query.reading) {
		var newReading = new Reading({ "name" : req.query.name, "reading" : req.query.reading });
		newReading.save(function (err, reading) {
			if (err) return console.error(err);
			res.send(reading);
		});
	} else{
		Reading.find({ "name" : req.query.name }, function (err, readings) {
			if (err) return console.error(err);
			if(readings.length) res.send(readings[readings.length-1]);
			else res.send('No readings');
		})
	}
});

router.get('/sensor', function(req, res){
	Sensor.find({ "name" : req.query.name }, function (err, sensors) {
		if(err) return console.error(err);
		if(sensors.length) res.send(sensors);
		else if(req.query.title){
			var newSensor = new Sensor({ "name" : req.query.name, "title" : req.query.title, "type" : req.query.type, "min" : req.query.min, "max" : req.query.max });
			newSensor.save(function (err, sensor) {
				if (err) return console.error(err);
				res.send(sensor);
			});
		}
	})
});

router.get('/sensors', function(req, res){
	Sensor.find({ "type" : req.query.type }, function (err, sensors) {
		if(err) return console.error(err);
		if(sensors.length) res.send(sensors);
		else res.send('No sensors');
	})
});

module.exports = router;