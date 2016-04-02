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
		this.auth = auth[key];
	}
	
	// Load keys from environment variables if they are missing in file:
	if(!_.has(auth, 'consumer_key')) {
		this.auth['consumer_key'] = process.env.CONSUMER_KEY;
	}
	if(!_.has(auth, 'consumer_secret')) {
		this.auth['consumer_secret'] = process.env.CONSUMER_SECRET;
	}
	if(!_.has(auth, 'access_token_key')) {
		this.auth['access_token_key'] = process.env.ACCESS_TOKEN_KEY;
	}
	if(!_.has(auth, 'access_token_secret')) {
		this.auth['access_token_secret'] = process.env.ACCESS_TOKEN_SECRET;
	}
	console.log('Environment has been set up.')
};

BotEnvironment.prototype.getEnvironment = function() {
	return {
		consumer_key: this.auth['consumer_key'],
		consumer_secret: this.auth['consumer_secret'],
		access_token_key: this.auth['access_token_key'],
		access_token_secret: this.auth['access_token_secret']
	};
}

module.exports = BotEnvironment;