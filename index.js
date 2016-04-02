var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var BotEnvironment = function(props) {
	
	this.default_props = { 
		auth_file: 'auth.js'
	};
	
	this.props = _.assignInWith({}, props, this.default_props , (o,s) => { return _.isUndefined(o) ? s : o; });
	
	if(this.props.auth_file[0] !== '/') {
		this.props.auth_file = process.cwd() + '/' + this.props.auth_file
	}
	
	this.auth = {};
	
	var auth;
	if(fs.existsSync(this.props.auth_file)) {
		auth = require(this.props.auth_file);
	} else {
		console.log('Did not find ' + this.props.auth_file + ' (bot may not run properly).');
	}
	
	for (var key in auth) {
		this.auth[key] = auth[key];
	}
	
	// Load keys from environment variables if they are missing in file:
	if(!_.has(auth, 'CONSUMER_KEY')) {
		this.auth['CONSUMER_KEY'] = process.env.CONSUMER_KEY;
	}
	if(!_.has(auth, 'CONSUMER_SECRET')) {
		this.auth['CONSUMER_SECRET'] = process.env.CONSUMER_SECRET;
	}
	if(!_.has(auth, 'ACCESS_TOKEN_KEY')) {
		this.auth['ACCESS_TOKEN_KEY'] = process.env.ACCESS_TOKEN_KEY;
	}
	if(!_.has(auth, 'ACCESS_TOKEN_SECRET')) {
		this.auth['ACCESS_TOKEN_SECRET'] = process.env.ACCESS_TOKEN_SECRET;
	}
	
	console.log('Environment has been set up.')
};

BotEnvironment.prototype.getEnvironment = function() {
	return {
		CONSUMER_KEY: this.auth['CONSUMER_KEY'],
		CONSUMER_SECRET: this.auth['CONSUMER_SECRET'],
		ACCESS_TOKEN_KEY: this.auth['ACCESS_TOKEN_KEY'],
		ACCESS_TOKEN_SECRET: this.auth['ACCESS_TOKEN_SECRET']
	};
}

module.exports = BotEnvironment;