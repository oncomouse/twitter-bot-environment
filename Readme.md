# twitter-bot-init

This library is meant to be a simple means of setting up a bot-by-bot authorization environment for Twitter. 

The library looks for a `auth.js` file in the root of your project (or can be changed by passing auth_file as a prop to the constructor). It then reads it into memory and provides an environment that can be passed to modules such as [twode](https://github.com/PunkChameleon/twode).

## Sample `auth.js`

It's best to add `auth.js` to your `.gitignore` file.

```javascript
module.exports = {
	CONSUMER_KEY: 'sample consumer key',
	CONSUMER_SECRET: 'sample consumer secret',
	ACCESS_TOKEN_KEY: 'sample access token key',
	ACCESS_TOKEN_SECRET: 'sample access token secret'
};
```

## Usage

```javascript
var BotEnvironment = require('twitter-bot-environment');
var twitter = require('twode');

var be = new BotEnvironment({
	auth_file: 'auth.js' // This is the default value and doesn't need to be passed
});

var twitter_client = new twitter(be.getEnvironment());
```