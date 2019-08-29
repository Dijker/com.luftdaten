'use strict';

const Homey = require('homey');

class Luftdaten extends Homey.App {
	
	onInit() {
		this.log('Luftdaten is running...');
	}
	
}

module.exports = Luftdaten;