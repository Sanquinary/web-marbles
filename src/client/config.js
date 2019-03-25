// Note: Do NOT modify this config file directly!
// If you want to override any settings,
// please do so in config.user.js!

const userConfig = require("./config.user");
const config = {};

config.controls = {};
config.controls.camera = {};
config.controls.camera.speed = 150;

config.network = {};
config.network.ssl = false;
config.network.tickrate = 10;
config.network.ticksToLerp = 2;
config.network.websockets = {};
config.network.websockets.port = 3014;
config.network.websockets.localReroute = false; // Setting this to true removes the port from client WS requests, useful for local proxying over :80 or :443

config.graphics = {};
config.graphics.castShadow = {};
config.graphics.castShadow.marbles = true;
config.graphics.receiveShadow = {};
config.graphics.receiveShadow.marbles = false;

/* Override any user properties set in config.user.js */
for(let key in userConfig) {
	let obj = config;
	let property;

	key.split(".").forEach( function(val) {
		if(obj) {
			if(typeof obj[val] !== "undefined") {
				if(typeof obj[val] === "object") {
					obj = obj[val]; // change to child object
				} else {
					property = val; // obj[property] is the property to set
				}
			} else {
				obj = null; // Property doesn't exist
			}
		}
	} );

	if(obj && property) {
		obj[property] = userConfig[key];
	} else {
		console.warn(`Warning: Cannot override non-existing config property: config.${key}`);
	}
}

module.exports = config;
