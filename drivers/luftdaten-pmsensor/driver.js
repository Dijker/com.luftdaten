'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

class LuftDatenDriver extends Homey.Driver {
	
	onInit() {
		this.log('Luftdaten Driver has been inited');
	}
	
   onPair(socket){

       

	
	
	  socket.on('validate', (data, callback) => {
        fetch('http://api.luftdaten.info/v1/sensor/'+data.sensorID+'/')
				.then(res => res.json())
                .then(json => {
                    if (json[0]) {
                        callback(null,'ok');
                    } else {
                        callback(new Error(Homey.__('pair.notfound')));
                    }
                }).catch(error => {
					console.log("error"+data.sensorID);
                    callback(new Error(Homey.__('pair.notreachable')));
                });
        });

   }
	
}

module.exports = LuftDatenDriver;