'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class LuftDatenDevice extends Homey.Device {
	
	onInit() {
		this.setAvailable();
		this.data = this.getData();
		this.settings = this.getSettings();
		this.log('Luftdaten Device has been inited');
		this.getSensorData();
		//intervall 5 minutes
		const me = this;
		setInterval(function() {
		me.getSensorData();
		console.log("5 min");
		}, 300000);
    }

		
	
	getSensorData()
	{
	console.log("GetSensorData")
	fetch('http://api.luftdaten.info/v1/sensor/'+this.data.id+'/')
    .then(res => res.json())
    .then(json => {
	var i;
	var sensor;
	var sensorvalues = [];
	var sid;
	for (i in json) {
	for (sensor in json[i].sensordatavalues) {
	if(!sensorvalues[json[i].sensordatavalues[sensor].value_type]) sensorvalues[json[i].sensordatavalues[sensor].value_type] = 0;
	sensorvalues[json[i].sensordatavalues[sensor].value_type] += parseInt(json[i].sensordatavalues[sensor].value);
	}	
	}
	for (sid in sensorvalues) {
	if (sid === "P1") this.setCapabilityValue('measure_pm10', sensorvalues[sid]/i)
	if (sid === "P2") 
	{
		this.setCapabilityValue('measure_pm25', sensorvalues[sid]/i);
		sensorvalues[sid]/i >= this.settings.pm25alarm ? this.setCapabilityValue('alarm_pm25', true) : this.setCapabilityValue('alarm_pm25', false);	
	}
	}
	})
	.catch(error => console.error(error));;
	}
	
}

module.exports = LuftDatenDevice;